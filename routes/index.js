import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res)=> {
  
  res.render('pages/index');
});

router.get('/Home',function(req,res,next)
{
    res.render('pages/Home',{ user: (req.session.user === undefined ? "" : req.session.user) })
});


export default router;