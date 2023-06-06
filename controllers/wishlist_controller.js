import {mongo} from 'mongoose';
import Product from '../models/products_model.js';
import { wishlist } from '../models/wishlist-model.js';


const addWishlist = async (req, res, next) => {

    const product_id = req.params.id;
    
    const product = await Product.findById(product_id);
      if(product)
      {
        let wish = new wishlist(req.session.wish ? req.session.wish : {});
        wish.add(product, product_id);
        req.session.wish = wish;
        console.log(req.session.wish);
        res.redirect('/products');
      }
      else
      {
        res.redirect('/products',);
      }
      
  };


const getWishlist = async (req, res,next) =>
{
  let wish = new wishlist(req.session.wish ? req.session.wish : {});
  if(wish.totalQty != 0)
  {
    console.log(wish);
    res.render('pages/wishlist',{ products: wish.generateArray() ,subtotal : wish.totalPrice,qt: wish.totalQty ,user:  (req.session.user === undefined ? "" : req.session.user) });
  }
  else
  {
    console.log("done");
    res.render('pages/wishlist',{ products: undefined ,subtotal : wish.totalPrice , qt: wish.totalQty , user:  (req.session.user === undefined ? "" : req.session.user) });
  }
};


  export {addWishlist,getWishlist} ;