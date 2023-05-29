import { mongo } from "mongoose";
import Product from '../models/products_model.js';
import {Cart}
from  "../models/cart-model.js";


// Get all products
const getProducts = async (req, res, next) => {
  let cart = new Cart(req.session.cart ? req.session.cart : {});
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
      res.render("pages/products",{products: products , user:  (req.session.user === undefined ? "" : req.session.user) ,qt: cart.totalQty});
    }) //get all products
    .catch((err) => {
      next(err);
    });
};

const addtowishlist = async (req,res,next)=>
{
  
};


export  {getProducts};