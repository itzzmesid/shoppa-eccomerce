const { check } = require('express-validator');

exports.validateSignInRequest = [
    check('email')
    .isEmail()
    .withMessage('A valid email is required'),
    check('password')
    .isLength({ min:6})
    .withMessage('Password must be at least 6 character'),
];