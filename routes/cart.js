import { Router } from 'express';

const router = Router();

/* GET Cart page. */
router.get('/', (req, res, next)=> {
  res.render('pages/cart');
});

export default router;