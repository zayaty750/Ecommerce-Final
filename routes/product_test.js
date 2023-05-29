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
router.get('/', getProducts);

/* GET Checkout page. */
// router.get('/add-to-cart/:id', (req, res, next)=> {
//   res.render('pages/cart', { user: (req.session.user === undefined ? "" : req.session.user) });
// });

router.get('/add-to-cart/:id',addCart);

export default router;