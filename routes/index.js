import { Router } from 'express';
import 
{
  getProducts
}
 from '../controllers/product_controller_client.js';
 import {
  addCart
}from "../controllers/cart_controller.js";

const router = Router();

/* GET home page. */
router.get('/', (req, res)=> {
  
  res.render('pages/index');
});

// Home page
router.get('/Home',function(req,res,next)
{
    res.render('pages/Home',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

// chat bot
router.get('/chatbot',(req,res,next)=>{
  res.render('pages/chatbot');
  });
  
// product page
router.get('/products', getProducts);
//  add to cart 
router.get('/add-to-cart/:id',addCart);

// Aboutus page
router.get('/About_us',function(req,res,next)
{
    res.render('pages/aboutus',{ user: (req.session.user === undefined ? "" : req.session.user) });
});



export default router;