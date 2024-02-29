const { Cart } = require("../db/models/cartModel");
const { Product } = require("../db/models/product");
const { Address } = require("../db/models/address");
const { Order, OrderDetails } = require("../db/models/order");
const { User } = require("../db/models/userModel");

//if user clicks proceeds to buy gets product details and addresses
const proceedToBuy = async (req, res) => {
  try {
    let userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    for (let i = 0; i < cart.cartItems.length; i++) {
      let id = cart.cartItems[i].productId;
      console.log("id " + id);
      const product = await Product.findById(id);
      console.log("\n\nstock " + product);
    }
    Address.find({ user: userId }).exec((error, address) => {
      if (error) return res.status(400).json({ error });
      else {
        res.status(200).send({ Cart: cart, Address: address[0].address });
      }
    });
  } catch (error) {
    res.status(400).send("OPERATION FAILED");
  }
};

const placeOrder = async (req, res) => {
  try {
    var userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    const completeAddress = await Address.find({ user: userId });
    const user = await User.findById(userId);

    let userName = user.first_name + " " + user.last_name;

    const addressId = req.query.addressId

    let addressIndex = completeAddress[0].address.findIndex(
      (a) => a._id == addressId
    );
    let selectedAddress = completeAddress[0].address[addressIndex];
    let totalPrice = cart.totalPrice;
    let cartItems = cart.cartItems;
    let paymentStatus = "Success"; // TODO : update after payment API
    let paymentMode = "UPI"; // TODO : update after payment API
    let paymentId = "001"; // TODO : update after payment API

    //for updating stock after purchase
    for (var i = 0; i < cart.cartItems.length; i++) {
      let id = cart.cartItems[i].productId;
      const product = await Product.findById(id);
      let quantity = cartItems[i].quantity;
      if (product.stock >= quantity) {
        //product in stock
        product.stock = product.stock - quantity;
        await product.save();
      } else {
        cartItems.findOneAndUpdate({productId : productId}, {
          $pull: {
            cartItems: {productId : productId}
          }
        })  
        .exec((error, data) => {
          if(error){
              return res.status(400).json({message: "error!"});
          }
          if(data){

              return res.status(200).json({ message: `Item deleted.`})
          } else {
              return res.status(200).json({ message: `Item not found.`})   

          }
        })


      }
    }
    var order = [
      {
        userId,
        userName,
        selectedAddress,
        totalPrice,
        cartItems,
        paymentStatus,
        paymentMode,
        paymentId,
      },
    ];
    Order.insertMany(order, function (err, res) {
      if (err) throw err;
      else {
        console.log("ORDER PLACED");
      }
    });
    res.status(200).send(order);

    // adding order details for vendor
    for (let i = 0; i < cart.cartItems.length; i++) {
      let cartItems = cart.cartItems[i];
      let vendorId = cart.cartItems[i].vendorId;
      var orderDetails = [
        {
          userId,
          vendorId,
          cartItems,
          userName,
          paymentMode,
        },
      ];
      console.log(orderDetails);
      OrderDetails.insertMany(orderDetails, function (err, res) {
        if (err) throw err;
      });
    }
    cart.cartItems = []; //clearing cart on checkout
    cart.totalPrice = 0;
    await cart.save();
  } catch (error) {
    res.status(400).send("OPERATION FAILED 1");
  }
};

module.exports = { proceedToBuy, placeOrder };
