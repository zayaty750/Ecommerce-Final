import { Router } from "express";
import multer from "multer";
import {
    addUser
  } from "../controllers/product_controller_admin.js";

/* GET sign up page. */
router.get('/', (req, res, next)=> {
  res.render('pages/Home');
});

 
router.post('/Signup-action' ,addUser);
 

  
export default router;