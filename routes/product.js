import { Router } from "express";
const router = Router();



// get the page
router.get('/', (req,res,next) =>
{
    console.log('product : GET');
    router.render('pages/product');
    router.send('message: product page loaded');
});



export default router;
