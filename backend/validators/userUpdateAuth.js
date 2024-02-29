const { check } = require('express-validator');

exports.validateUpdateRequest = [
    check('first_name')
    .notEmpty()
    .withMessage('First name is required'),
    check('last_name')
    .notEmpty()
    .withMessage('Last name is required'),
    check('email')
    .isEmail()
    .withMessage('valid Email is required'),
    check('phone')
    .notEmpty()
    .isNumeric()
    .isLength({min:10, max:12})
    .withMessage('phone number is required'),
    check('password')
    .isLength({ min:6})
    .withMessage('Password must be at least 6 character'),
];