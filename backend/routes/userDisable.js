const express = require('express');
const router = express.Router();
const { requireAdminSignin } = require("../middleware/adminAuth");
const { requireSignin } = require("../middleware/tokenAuth");
const {userActivate} = require("../controllers/userDisable")

router.get("/activate",requireSignin,requireAdminSignin,userActivate);

module.exports = router;