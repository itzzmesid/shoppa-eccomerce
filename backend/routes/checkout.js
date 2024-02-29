const express = require("express");
const router = express.Router();
var checkout = require("../controllers/checkoutController");
const { requireSignin } = require("../middleware/tokenAuth");

router.get("/", requireSignin, checkout.proceedToBuy);
router.post("/", requireSignin, checkout.placeOrder);

module.exports = router;
