const express = require("express");
const router = express.Router();
// var checkout = require("../controllers/checkoutController");
const { getUser } = require("../controllers/listUser");
const { requireAdminSignin } = require("../middleware/adminAuth");
const { requireSignin } = require("../middleware/tokenAuth");

router.get("/:userType", requireSignin, requireAdminSignin, getUser);

module.exports = router;
