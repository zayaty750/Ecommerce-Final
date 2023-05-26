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
      res.render("pages/all_products", { products: products });
    }) //get all products
    .catch((err) => {
      next(err);
    });
};

const addtowishlist = async (req,res,next)=>
{
  
};


export  {getProducts};