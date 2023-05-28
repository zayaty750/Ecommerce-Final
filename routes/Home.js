import { Router } from "express"; 
const router = Router();

router.get('/',function(req,res,next)
{
    res.render('pages/Home',{ user: (req.session.user === undefined ? "" : req.session.user) })
    console.log(req.session.user);
});

export default router; 
