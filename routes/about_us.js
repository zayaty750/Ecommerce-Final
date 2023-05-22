import {Router} from 'express';

const router = Router();

router.get('/aboutus',function(req,res,next)
{
    console.log('about_us.js: GET /');
    res.render('pages/about_us');
});

export default router;