import { Router } from 'express';
import multer from "multer";
import 
{
  getProducts
}
 from '../controllers/product_controller_client.js';
 import {
  addCart
}from "../controllers/cart_controller.js";
import {
    addUser,
    GetUser
  } from "../controllers/user_controller.js";


const router = Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1]) //Appending file extension
  }
})

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', (req, res)=> {
  
  res.render('pages/index');
});

// Home page
router.get('/Home',function(req,res,next)
{
    res.render('pages/Home',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

// chat bot
router.get('/chatbot',(req,res,next)=>{
  res.render('pages/chatbot');
  });
  
/*               Products               */

// product page
router.get('/products', getProducts);

//  add to cart 
router.get('/add-to-cart/:id',addCart);

/*               End                 */

// Aboutus page
router.get('/About_us',function(req,res,next)
{
    res.render('pages/aboutus',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
  

/* GET sign up page. */
router.get('/Signin', (req, res)=> {
  res.render('pages/Signup',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
 
// POST a single user: user/
router.post("/Signin", upload.single('image'), addUser);


router.get('/Login', (req, res)=> {
  res.render('pages/login',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
 
router.post("/Login", GetUser);

router.get('/Signout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

export default router;