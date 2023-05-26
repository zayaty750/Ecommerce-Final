import { Router } from "express";
import multer from "multer";
import {
    addUser
  } from "../controllers/usercontroller.js";



  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1]) //Appending file extension
    }
  })
  
  const upload = multer({ storage: storage });


  
const router = Router();

/* GET sign up page. */
router.get('/add', (req, res, next)=> {
  res.render('pages/Signup');
});
 
// POST a single product: products/
router.post("/add", upload.single('image'), addUser);
  
export default router;