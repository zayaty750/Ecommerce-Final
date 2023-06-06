import { mongo } from "mongoose";
import Product from '../models/products_model.js';
import { render } from "ejs";
import fs from 'fs';


// Get all products
const getProducts = async (req, res, next) => {

  if (req.session.user.isAdmin == true) {
    const products = Product.find({})
      .then((products) => {

        if (products.length > 0) {
          products.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA - dateB;
          });
        }


        //res.json(products);
        res.render("pages/product_dashboard", { products: products, user: (req.session.user === undefined ? "" : req.session.user) });
      }) //get all products
      .catch((err) => {
        next(err);
      });
  }
  else {

  }

};

// Create a product
const createProduct = async (req, res, next) => {

  if (req.session.user.isAdmin == true) {
    //get the product data from the request body
    const imgPath = req.file.path;
    const imgURL = req.file.path.substring(req.file.path.indexOf("/") + 7);
    const product = {
      //create a new product
      pname: req.body.name,
      Price: req.body.price,
      Description: req.body.description,
      category: req.body.category,
      Image: imgURL //remove public from the path
    };
    console.log(product);
    try {
      await Product.create(product);

      res.redirect("/view-products");
    } catch (err) {
      //if there is an error, send it to the error handler
      next(err);
    }
  }
  else {
    res.render('pages/error');
  }
};

// Update a product form
const updateProductForm = async (req, res, next) => {
  
  const id =  req.params.id;
  try {
    if (!mongo.ObjectId.isValid(id) ) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }

    
    const product = await Product.findById(id);
    if (product) {
      //return res.status(200).json(product);
      return res.render("pages/edit-product", {  product: product ,  user: (req.session.user === undefined ? "" : req.session.user)});
    }
    throw new Error(`Product with id ${id} not found`);
    
  } catch (err) {
    next(err);
  }
};

// Update a product
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    if (!mongo.ObjectId.isValid(id) ) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
      });

    if (product) {
      console.log("edited");
        return res.redirect("pages/edit-product");
    } else {
      res.status(404).json({ message: "Product not found" });
    }

  } catch (err) {
    next(err);
  }
  
};

// Delete a product
const deleteProduct = async ({ params: { id } }, res, next) => {

  try {
    if (!mongo.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }
    //const product = await Product.findById(req.params.id);
    const product = await Product.findOneAndDelete({ _id: id });
    // fs.unlink(path.join(__dirname, '/images' + req.params.Image), (err) => {
    //   if (err) {
    //     throw err;
    //   }
    // });
    if (product) {
      console.log('data deleted to th')
      // await product.remove();
      //res.json({ message: "Product removed" });
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    next(err);
  }
};

export { createProduct, getProducts, deleteProduct, updateProduct, updateProductForm };