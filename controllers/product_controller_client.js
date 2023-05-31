import { mongo } from "mongoose";
import Product from '../models/products_model.js';
import {Cart}
from  "../models/cart-model.js";


// Get all products
const getProducts = async (req, res, next) => {
  
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  let page = req.query.page || 1;
  const limit = 3;

  const skip = (page-1) * limit;
  const products = await Product.find().skip(skip).limit(limit);

  const All_products = await Product.find();
  const numberofResults = All_products.length;
  const numberofPages = Math.ceil(numberofResults / limit );
  
  let iterator = 1;
  let endingLink = numberofPages;
  // 3ashan ana lw fy awl saf7a kda l iterator hyb2a bl minus
   //res.json(products);
  res.render("pages/products",{products: products , user:  (req.session.user === undefined ? "" : req.session.user) ,qt: cart.totalQty,iterator,endingLink ,page,numberofPages});



};

const addtowishlist = async (req,res,next)=>
{
  
};


export  {getProducts};