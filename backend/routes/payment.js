const express = require("express");
const { processpayment, sendStripeApikey } = require("../controllers/payment");
const { requireSignin } = require("../middleware/tokenAuth");
const router = express.Router();

router.post("/process", requireSignin, processpayment);
router.get("/stripeapikey", requireSignin, sendStripeApikey);

// router.get('/checkout-session/:orderId', processpayment);


module.exports = router;
