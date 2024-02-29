const express = require('express'); 
const router = express.Router();

const { requireSignin } = require('../middleware/tokenAuth');
const {profileEdit, changePassword, changeEmail} = require('../controllers/editProfileController');

router.patch('/',requireSignin,profileEdit);
router.patch('/password', requireSignin,changePassword);
router.patch('/email', requireSignin,changeEmail);

module.exports = router;