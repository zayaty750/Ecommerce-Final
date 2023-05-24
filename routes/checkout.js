import { Router } from 'express';

const router = Router();

/* GET Checkout page. */
router.get('/', (req, res, next)=> {
  console.log('index.js: GET /');
  res.render('pages/checkout');
});

export default router;