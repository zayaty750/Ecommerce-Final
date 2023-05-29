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
        res.redirect('/');
      }

      req.session.cart;
      
  };


  export {addCart} ;