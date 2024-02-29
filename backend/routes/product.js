const express = require("express");
const router = express.Router();
const { requireProductPermission } = require("../middleware/productAuth");
const { requireSignin } = require("../middleware/tokenAuth");
const {
  createProduct,
  getProductBySlug,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  activateProduct,
} = require("../controllers/product");

const upload = require("../utils/multer");

//Add a new product. Can be done by admin/vendor
router.post(
  "/",
  requireSignin,
  requireProductPermission,
  upload.array("productPicture"),
  createProduct
);

//Get all products
router.get("/", getAllProducts);

//Get details of a specific product by Id
router.get("/:id", getProductById);

//Update a product by Id
router.put("/:id", requireSignin, requireProductPermission, updateProduct);

//Delete a product by Id
router.delete("/:id", requireSignin, requireProductPermission, deleteProduct);

//Activate/ Deactivate a product
router.post("/:id", requireSignin, requireProductPermission, activateProduct);

module.exports = { router };
