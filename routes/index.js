import { Router } from 'express';
import {Cart}
from  "../models/cart-model.js";
import Product from '../models/products_model.js';


const router = Router();


/* GET home page. */
router.get('/', (req, res)=> {
  
    res.render('pages/index',{user: (req.session.user === undefined ? "" : req.session.user)});
  });

// Home page
router.get('/Home',function(req,res,next)
{
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
      res.render("pages/Home", { products: products, user: (req.session.user === undefined ? "" : req.session.user),qt: cart.totalQty}); 

    }) //get all products
   
});

// Aboutus page
router.get('/About_us',function(req,res,next)
{
    res.render('pages/aboutus',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
// Aboutus page
router.get('/Features',function(req,res,next)
{
    res.render('pages/features',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
// chat bot
router.get('/chatbot',function(req,res,next)
{
    res.render('pages/chatbot');
});

export default router;