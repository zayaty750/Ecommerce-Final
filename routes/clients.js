import { Router } from 'express';

const router = Router();

/* GET Client page. */
router.get('/', (req, res, next)=> {
  console.log('index.js: GET /');
  res.render('pages/clients');
});

export default router;