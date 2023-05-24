import { mongo } from "mongoose";
import Product from '../models/products_model.js';

// Create a product
const createProduct = async (req, res, next) => {
  //get the product data from the request body
  const imgPath = req.file.path;
  const imgURL = req.file.path.substring(req.file.path.indexOf("/") + 1);
  const product = {
    //create a new product
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: imgURL //remove public from the path
  };
  //console.log(product);
  try {
    const newProduct = await Product.create(product);
    //res.status(201).json(newProduct);
    res.redirect("/products");
  } catch (err) {
    //if there is an error, send it to the error handler
    next(err);
  }
};
export  {createProduct};