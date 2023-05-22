import { Router } from "express"; 
const router = Router();

router.get('/Home',function(req,res,next)
{
    console.log('Home.js : GET /')
    res.render('pages/Home')
});

export default router; 
