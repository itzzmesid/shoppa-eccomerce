const express = require("express");
const { removeUser } = require("../controllers/removeUser");
const router = express.Router();
const { requireAdminSignin } = require("../middleware/adminAuth");
const { requireSignin } = require("../middleware/tokenAuth");

router.get("/remove/:id",requireSignin,requireAdminSignin,removeUser);

module.exports = router;