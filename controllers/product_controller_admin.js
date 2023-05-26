import { mongo } from "mongoose";
import Product from '../models/products_model.js';



// Get all products
const getProducts = async (req, res, next) => {
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
      res.render("pages/product_dashboard", { products: products });
    }) //get all products
    .catch((err) => {
      next(err);
    });
};

// Create a product
const createProduct = async (req, res, next) => {
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

    res.redirect("/product_dashboard");
  } catch (err) {
    //if there is an error, send it to the error handler
    next(err);
  }
};

// Update a product form
const updateProductForm = async ({ params: { id } }, res, next) => {
  try {
    if (!mongo.ObjectId.isValid(id) ) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }

    const product = await Product.findById(id);
    console.log(product);
    if (product) {
      //return res.status(200).json(product);
      return res.render("pages/edit-product", { product: product});
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
      console.log(product);
    if (product) {
      res.status(200).json(product);
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
    if (!mongo.ObjectId.isValid(id) ) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }
    //const product = await Product.findById(req.params.id);
    const product = await Product.findOneAndDelete({ _id: id });
    if (product) {
      console.log('data sent to th')
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

export  {createProduct,getProducts,deleteProduct,updateProduct,updateProductForm};