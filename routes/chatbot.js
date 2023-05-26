import { Router } from 'express';
const router=Router();

router.get('/',(req,res,next)=>{
res.render('pages/chatbot');
});

export default router;