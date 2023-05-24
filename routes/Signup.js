import { Router } from 'express';

const router = Router();

/* GET sign up page. */
router.get('/', (req, res, next)=> {
  console.log('index.js: GET /');
  res.render('pages/index');
});

export default router;