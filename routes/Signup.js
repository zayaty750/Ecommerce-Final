import { Router } from 'express';

const router = Router();
//nour
//signup.use(express.urlencoded({extendd: true}));


/* GET sign up page. */
router.get('/', (req, res, next)=> {
  console.log('index.js: GET /');
  res.render('pages/index');
});


//nour
router.post('/Signup-action',(req,res)=>{
 

  
export default router;