import {Router} from 'express';

const router = Router();

router.get('/about_us',function(req,res,next)
{
    console.log('about_us.js: GET /');
    res.render('about_us');
});