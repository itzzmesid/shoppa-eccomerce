const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/signin");
const { isRequestValidated } = require("../middleware/requestValidation");
const { validateSignInRequest } = require("../validators/signinAuth");

router.post("/", validateSignInRequest, isRequestValidated, signin);

module.exports = router;
