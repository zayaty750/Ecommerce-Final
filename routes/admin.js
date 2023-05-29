import { Router } from 'express';

const router = Router();

/* GET admin page. */
router.get('/', (req, res, next)=> {
  res.render('pages/admin_dashboard');
});

export default router;