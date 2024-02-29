const { Cart } = require("../db/models/cartModel");
const { Product } = require("../db/models/product");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

//to add a product into cart
const addToCart = async (req, res) => {
  let userId = req.user.id; //user id of logged in user
  let productId = req.query.productId; // TODO: to be replaced by product id from product table
  var quantity = req.body.cartItems.quantity;
  var totalPrice = 0;

  try {
    var cart = await Cart.findOne({ userId });
    var productDetails = await Product.findById(productId);

    productName = productDetails.productName;
    productPrice = productDetails.productPrice;
    productPictures = productDetails.productPictures[0];
    if (cart) {
      //if cart exists for user
      let itemIndex = cart.cartItems.findIndex((p) => p.productId == productId);
      cart.totalPrice = 0;
      if (itemIndex > -1) {
        //if product already exists in the cart, update the quantity
        let productItem = cart.cartItems[itemIndex];
        productItem.quantity = parseInt(quantity);
        cart.cartItems[itemIndex] = productItem;
      } else {
        //if product does not exists in cart, add as new product
        cart.cartItems.push({
          productId,
          productPictures,
          productName,
          productPrice,
          quantity,
        });
      }
      for (let i = 0; i < cart.cartItems.length; i++) {
        cart.totalPrice =
          cart.totalPrice +
          cart.cartItems[i].quantity * cart.cartItems[i].productPrice;
      }
      cart = await cart.save();
      return res.status(200).send(cart);
    } else {
      //if cart doesn't exist for user, create new cart
      totalPrice = productDetails.productPrice * quantity;
      let newCart = await Cart.create({
        userId,
        cartItems: [
          { productId, productPictures, productName, productPrice, quantity },
        ],
        totalPrice,
      });
      return res.status(200).send(newCart);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

//lists all the details of items in cart
const listCart = async (req, res) => {
  try {
    let userId = req.user.id; //user id of logged in user
    let newCart = await Cart.findOne({ userId });
    if (newCart) {
      res.status(200).send(newCart);
    } else {
      res.status(400).send("EMPTY CART");
    }
  } catch (error) {
    res.status(400).send("OPERATION FAILED");
  }
};

//deletes details about a product completely
const deleteCart = async (req, res) => {
  try {
    let productId = req.query.productId; //TODO: to be replaced by product id of product selected by user
    let userId = req.user.id; //user id of logged in user
    let productDetails = await Product.findById(productId);
    let productPrice = productDetails.productPrice;
    let quantity = req.query.quantity;
    Cart.findOne({ userId: userId }).exec((error, cart) => {
      if (error) {
        return res.status(401).json({ error });
      }
      if (cart) {
        Cart.findOneAndUpdate(
          { userId: userId },
          {
            $pull: {
              cartItems: { productId: productId },
            },
          }
        ).exec((error, data) => {
          if (error) {
            return res.status(400).json({ message: "error" });
          }
          if (data) {
            //cart.totalPrice = 0
            cart.totalPrice = parseInt(
              cart.totalPrice - productPrice * quantity
            );
            cart = cart.save();
            return res.status(200).json({ message: `Product deleted.` });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).send("OPERATION FAILED");
  }
};

module.exports = { addToCart, listCart, deleteCart };
