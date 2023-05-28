import { Router } from "express";
import multer from "multer";
import {
    addUser,
    getclients
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

// GET clients: clients/
router.get("/", getclients);

/* GET sign up page. */
router.get('/Signup', (req, res)=> {
  res.render('pages/Signup',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
 
// POST a single product: products/
router.post("/Signup", upload.single('image'), addUser);
  
export default router;