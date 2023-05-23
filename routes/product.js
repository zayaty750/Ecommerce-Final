import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  console.log('index.js: GET /');
  res.render('pages/product');
});

export default router;