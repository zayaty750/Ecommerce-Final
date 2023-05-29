import {mongo} from 'mongoose';
import Product from '../models/products_model.js';
import {Cart}
 from  "../models/cart-model.js";

// Create a client
const addCart = async (req, res, next) => {

    const product_id = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    
    const product = await Product.findById(product_id);
      if(product)
      {
        cart.add(product, product_id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/products');
      }

      req.session.cart;
      
  };


  // Create a client
const getCart = async (req, res,next) =>
{
  let cart = new Cart(req.session.cart);
  res.render('pages/cart',{ products: cart.generateArray() ,subtotal : cart.totalPrice,qt: cart.totalQty ,user:  (req.session.user === undefined ? "" : req.session.user) });
  console.log(cart.generateArray());
};


  export {addCart,getCart} ;