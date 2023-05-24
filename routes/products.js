import { Router } from "express";
import {
    createProduct
  } from "../controllers/product_controller.js";

const router = Router();


// GET add product form
router.get("/add", (req, res, next) => {
  res.render("pages/add_product", { title: "Add Product", mode: 'add',product: {name: '', description: '', price: '', imageUrl: ''}  });
});

export default router;