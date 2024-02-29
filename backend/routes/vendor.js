const express = require("express");
const router = express.Router();

const {vendorRevenue,orderDetails, getVendorOrders,listVendorProducts} = require("../controllers/vendorController");
const { OrderDetails } = require("../db/models/order");
const { requireSignin } = require("../middleware/tokenAuth");
const { vendorVerification } = require("../middleware/vendorAuth");


router.get("/list-products", requireSignin, vendorVerification, listVendorProducts); //Lists all the product sold by a vendor
router.get("/orders", requireSignin,vendorVerification, getVendorOrders); //See all the orders came for a product sold by a vendor 
router.get("/revenue", requireSignin, vendorVerification, vendorRevenue);

module.exports = router;
