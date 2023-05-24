import { Router } from "express";
import {
    createProduct
  } from "../controllers/product_controller.js";

const router = Router();

// GET add product form
router.get("/", (req, res, next) => {
    res.render("pages/add_product");
});


export default router;