const { json } = require("express");
const { OrderDetails } = require("../db/models/order");
const { Revenue } = require("../db/models/vendorRevenue");
const { Order } = require("../db/models/order");
const { Product } = require("../db/models/product");
const logger = require("../logger/logs");

//Lists purchased products of logged in vendor
const orderDetails = async (req, res) => {
  try {
    let vendorId = req.user.id;
    console.log(vendorId);
    const orderDetails = await OrderDetails.find({ vendorId });
    // console.log(orderDetails);
    res.status(200).send(orderDetails);
  } catch (error) {
    logger.error(`${error} ${req.socket.remoteAddress}`)
    res.status(400).send("OPERATION FAILED");
  }
};

//calculates total revenue of logged in vendor
const vendorRevenue = async (req, res) => {
  try {
    let vendorId = req.user.id; //TODO : change total revenue to revenue of individual products.
    let totalRevenue = 0;
    Order.find({ vendorId: vendorId })
      .select({
        cartItems: { $elemMatch: { vendorId: vendorId } },
      })
      // .populate("userId , paymentMode, orderStatus")
      .exec(async (error, orders) => {
        if (error) return res.status(400).json({ error });
        if (orders) {
          for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].cartItems.length; j++) {
              totalRevenue =
                totalRevenue +
                orders[i].cartItems[j].productPrice *
                  orders[i].cartItems[j].quantity;
            }
          }
          res.status(200).json({ totalRevenue });
        }
      });
  } catch (error) {
    logger.error(`${error} ${req.socket.remoteAddress}`)
    res.status(400).send("OPERATION FAILED");
  }
};

const getVendorOrders = async (req, res) => {
  const loggedInVendor = req.user.id;
  Order.find({ vendorId: loggedInVendor })
    .select({
      cartItems: { $elemMatch: { vendorId: req.user.id } },
      _id: 1,
      productName: 1,
      paymentMode: 1,
      orderStatus: 1,
      userName: 1,
      createdAt: 1,
    })
    // .populate("userId , paymentMode, orderStatus")
    .exec(async (error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        // console.log(orders[0].cartItems);

        //
        // console.log(orders);
        let nonEmptyOrders = orders.filter(
          (item) => item.cartItems.length == 1
        );
        if (nonEmptyOrders.length == 0) {
          return res.status(200).json({
            code: 200,
            message: `You don't have any active orders yet`,
          });
        }
        return res.status(201).json({ nonEmptyOrders });

        //return res.status(201).json({orders});
      }
    });
};

//=================================================
//To list products added by vendor in vendor page.
//=================================================

const listVendorProducts = async (req, res) => {
  const vendorId = req.user.id;

  Product.find({ productSoldBy: vendorId })
    .select("productName createdAt stock productPrice")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (product.length == 0) {
        return res.status(200).json({
          code: 200,
          message:
            "You haven't added any products! Kindly add products to receive orders",
        });
      } else return res.status(200).json({ code: 200, items: product });
    });
};

module.exports = {
  listVendorProducts,
  orderDetails,
  vendorRevenue,
  getVendorOrders,
};
