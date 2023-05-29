import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res)=> {
  
  res.render('pages/index');
});

// Home page
router.get('/Home',function(req,res,next)
{
    res.render('pages/Home',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

// Aboutus page
router.get('/About_us',function(req,res,next)
{
    res.render('pages/aboutus',{ user: (req.session.user === undefined ? "" : req.session.user) });
});



export default router;