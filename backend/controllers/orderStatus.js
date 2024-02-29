const {Order} = require('../db/models/order')

exports.OrderStatusUpdate = async(req, res) => {
    const orderId = req.query.orderId;
    const orderStatus = req.query.orderStatus;
    
    await Order.findByIdAndUpdate((orderId), {$set: {orderStatus: orderStatus}}, function(error, status){
        if(error) res.status(401).json({code: 401, message:`Something went wrong`})
        if(status){
            return res.status(200).json({code:200, message:"Order status updated."});
        }
    })
}
