const express = require("express");
const router = express.Router();
const { requireSignin } = require("../middleware/tokenAuth");
const {signout} = require('../controllers/signout')

router.post("/", requireSignin, signout);

module.exports = router;