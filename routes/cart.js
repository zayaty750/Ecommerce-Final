import { Router } from 'express';
import {
  addCart
}from "../controllers/cart_controller.js";
const router = Router();

/* GET Checkout page. */
// router.get('/add-to-cart/', (req, res, next)=> {
//   res.render('pages/cart', { user: (req.session.user === undefined ? "" : req.session.user) });
// });

router.get('/add-to-cart/:id',addCart);
export default router;