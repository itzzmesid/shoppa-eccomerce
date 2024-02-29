const { check } = require("express-validator");

exports.validateAddAddressRequest = [
  check("recipientName").notEmpty().withMessage("Name is required"),

  check("unitNumber").notEmpty().withMessage("unit number is required"),

  check("addressLine1").notEmpty().withMessage("Address is required"),

  check("city").notEmpty().withMessage("City is required"),

  check("state").notEmpty().withMessage("State is required"),

  check("country").notEmpty().withMessage("Country is required"),

  check("pincode").notEmpty().withMessage("Pincode is required"),

  check("phoneNumber").notEmpty().withMessage("Phone number is required"),
];
