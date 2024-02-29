const express = require('express'); 
const router = express.Router();

const {OrderStatusUpdate} = require('../controllers/orderStatus');

router.post('/status-update', OrderStatusUpdate);

module.exports = router;