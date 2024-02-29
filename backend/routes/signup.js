const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/signup");
const { validateSignUpRequest } = require("../validators/signupAuth");
const { isRequestValidated } = require("../middleware/requestValidation");
const { requireAdminSignin } = require("../middleware/adminAuth");

router.post("/", validateSignUpRequest, isRequestValidated, signup);
router.post("/:userType", requireAdminSignin, validateSignUpRequest, isRequestValidated, signup)

module.exports = router;
