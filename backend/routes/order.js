const express = require("express");
const router = express.Router();

const { addOrder, getVendorOrders } = require("../controllers/order");
const { requireSignin } = require("../middleware/tokenAuth");

router.post("/addOrder", requireSignin, addOrder);

// router.get("/getOrders", requireSignin, getVendorOrders);
router.get("/vendor/getOrder", requireSignin, getVendorOrders);

module.exports = router;
