import { Router } from 'express';

const router = Router();

/* GET team page. */
router.get('/', (req, res, next)=> {
  res.render('pages/team');
});

export default router;