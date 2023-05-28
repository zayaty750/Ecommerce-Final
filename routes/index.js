import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  
  res.render('pages/index',{user: (req.session.user === undefined ? "" : req.session.user)});
  console.log(req.session.user);
});

export default router;