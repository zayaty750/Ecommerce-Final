import { Router } from "express";
import multer from "multer";
import {
    addUser,
    getclients,
    GetUser
  } from "../controllers/user_controller.js";


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