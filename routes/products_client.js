import { Router } from "express";
import multer from "multer";
import {
    getProducts
  } from "../controllers/product_controller_client.js";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1]) //Appending file extension
  }
})

const upload = multer({ storage: storage });

//const upload = multer({ dest: 'public/images/uploads/' });

const router = Router();


// GET products: products/
router.get("/", getProducts);

export default router;