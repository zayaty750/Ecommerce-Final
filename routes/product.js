import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  console.log('index.js: GET /');
  res.render('pages/product');
});

//Create a product: /products
router.post("/", (req, res, next) => {
    res.json({message: `Product Created ${req.body.name}`});
});
  

export default router;