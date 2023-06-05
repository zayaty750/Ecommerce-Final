import { Router } from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  updateProductForm
} from "../controllers/product_controller_admin.js";

import {
  getTeam,
  addAdmin
} from "../controllers/admin_controller.js";


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


/* GET team page. */
router.get('/admin_dashboard', (req, res) => {
  if (req.session.user.isAdmin === true) {
    res.render('pages/admin_dashboard', { user: (req.session.user === undefined ? "" : req.session.user) });
  }
  else {
    res.render('pages/error');
  }

});
router.get("/team", getTeam);


// GET add admin form
router.get("/add-admin", (req, res, next) => {
  if (req.session.user.isAdmin === true) {
    res.render("pages/add-admin", { user: (req.session.user === undefined ? "" : req.session.user) });
  }
  else {
    res.render('pages/error');
  }
});
router.post("/add-admin", addAdmin);



// GET products: products
router.get("/view-products", getProducts);

// GET a single product: products/find/:id
// router.get("/find/:id", getProductById);


// GET add product form
router.get("/add-product", (req, res, next) => {
  if (req.session.user.isAdmin === true) {
    res.render("pages/add-product", { user: (req.session.user === undefined ? "" : req.session.user) });
  }
  else {
    res.render('pages/error');
  }
});

// POST a single product: products
router.post("/add-product", upload.single('image'), createProduct);


// GET add product form
router.get("/edit/:id", updateProductForm);

/* Patch a single product: products/:id
  When a client needs to replace an existing Resource entirely,
  they can use PUT. When they're doing a partial update, they can use HTTP PATCH
*/

router.patch("/edit/:id", updateProduct);


// DELETE a single product: products/:id
router.delete("/delete/:id", deleteProduct);

export default router;