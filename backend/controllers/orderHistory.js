const {Order} = require('../db/models/order')

exports.customerOrderHistory = (req, res) => {
    const userId = req.user.id;
    console.log(userId);

    Order.find({userId: userId})
    .select({
        _id: 1,
        // userId: 1,
        // userName: 1,
        // selectedAddress: 1,
        cartItems: 1,
        totalPrice:1,
        // paymentStatus: 1,
        paymentMode: 1,
        orderStatus: 1,
        createdAt: 1,
        // updatedAt: 0
    })
    .exec((error, order) => {
        if(error){
            console.log(error);
            return res.status(400).json({error});
        }
        if(order){
            return res.status(201).json({order});
        }
    })
}