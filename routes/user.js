import { Router } from 'express';
import multer from "multer";
import jwt from "jsonwebtoken";
import {
  register,
  login
} from "../controllers/authController.js"

import {
  getForgotPasswordView,
    sendForgotPasswordLink,
    getResetPasswordView,
    resetThePassword
} from "../controllers/passwordController.js"

import 
{
  getProducts
}
 from '../controllers/product_controller_client.js';
 
 import {
  addCart,
  getCart
}from "../controllers/cart_controller.js";

  import {Cart}
 from  "../models/cart-model.js";

import {payment,updateprofile} from '../controllers/user_controller.js'

import Product from "../models/products_model.js";


const router = Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1]) //Appending file extension
  }
})

const upload = multer({ storage: storage });


router.get('/Profile', (req, res)=> {

  let cart = new Cart(req.session.cart ? req.session.cart : {});
  if(req.session.user === undefined)
  {
    res.render('pages/profile',{ user: (req.session.user === undefined ? "" : req.session.user) });
  }
  else
  {
    res.render('pages/profile', { user: (req.session.user === undefined ? "" : req.session.user) } );
  }

});


/* GET home page. */
router.get('/checkout', (req, res)=> {

  let cart = new Cart(req.session.cart ? req.session.cart : {});
  if(req.session.user)
  {
    res.render('pages/checkout',{user: (req.session.user === undefined ? "" : req.session.user),key: process.env.PUBLISHABLE_KEY, products: cart.generateArray() , subtotal : cart.totalPrice , qt: cart.totalQty, key: process.env.PUBLISHABLE_KEY});
  }
  else
  {
    res.render('pages/Signup',{user: (req.session.user === undefined ? "" : req.session.user),message : undefined});
  }
});

router.post('/payment',payment)

/*               Products               */

// product page

router.get('/products', getProducts);

//  add to cart 
router.get('/add-to-cart/:id',addCart);

router.get('/cart',getCart);

// reduce by 1 route
router.get("/reduce/:id",function(req,res,next){
  let productId = req.params.id;
  let cart = new Cart(req.session.cart? req.session.cart :{});
  cart.reduceByOne(productId);
  req.session.cart=cart;
  res.redirect('/user/add-to-cart');
})
// remove 
router.get("/reduce/:id",function(req,res,next){
  let productId = req.params.id;
  let cart = new Cart(req.session.cart? req.session.cart :{});

  cart.removeItem(productId);
  req.session.cart=cart;
  res.redirect('/user/add-to-cart');
})


/*               End                 */

router.get('/editprofile', (req, res)=> {
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  if(req.session.user)
  {
    res.render('pages/editprofile',{ user: (req.session.user === undefined ? "" : req.session.user) , qt: cart.totalQty , message: undefined});
  }
  else
  {
    res.render('pages/error', { user: (req.session.user === undefined ? "" : req.session.user) , qt: cart.totalQty } );
  }

});
 
router.patch('/editprofile/:id',updateprofile)


/* GET sign up page. */
router.get('/Signin', (req, res)=> {
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  if(req.session.user === undefined)
  {
    res.render('pages/Signup',{ user: (req.session.user === undefined ? "" : req.session.user) , qt: cart.totalQty , message: undefined});
  }
  else
  {
    res.render('pages/error',{ user: (req.session.user === undefined ? "" : req.session.user) , qt: cart.totalQty } );
  }

});
 
// POST a single user: user/
router.post("/Signin", register);

// get login /page
router.get('/Login', (req, res)=> {

  let cart = new Cart(req.session.cart ? req.session.cart : {});
  if(req.session.user === undefined)
  {
    res.render('pages/login',{ user: (req.session.user === undefined ? "" : req.session.user) , qt: cart.totalQty , message: undefined});
  }
  else
  {
    res.render('pages/error', { user: (req.session.user === undefined ? "" : req.session.user) , qt: cart.totalQty } );
  }

});
// send data from login /page 
router.post("/Login", login);

// sign_out
router.get('/Signout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// /password/forgot-password
router.route("/forgot-password")
.get(getForgotPasswordView)
.post(sendForgotPasswordLink);

// /password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword)

  //document.getElementById(search).value()
// Search for products
router.post("/search",async (req,res)=>{
  let data = await Product.find(
      {
          "$or":[
              {pname:{$regex:req.body.search}},
              {category:{$regex:req.body.search}},
          ]
      }
  )
  // let cart = new Cart(req.session.cart ? req.session.cart : {});

  // let page = req.query.page || 1;
  // const limit = 3;

  // const skip = (page-1) * limit;
  // const products = await Product.find().skip(skip).limit(limit);

  // const All_products = await Product.find();
  // const numberofResults = All_products.length;
  // const numberofPages = Math.ceil(numberofResults / limit );
  
  // let iterator = 1;
  // let endingLink = numberofPages;

  res.render("pages/search",{products:data, user:  (req.session.user === undefined ? "" : req.session.user)});

})





export default router;