const express = require('express'); 
const router = express.Router();

const {requireSignin} = require('../middleware/tokenAuth');
const {requireUserSignin} = require('../middleware/userAuth');
const {customerOrderHistory} = require('../controllers/orderHistory');

router.get('', requireSignin, requireUserSignin, customerOrderHistory);

module.exports = router;