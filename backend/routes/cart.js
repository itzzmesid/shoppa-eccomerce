const express = require("express");
const router = express.Router();

var controller = require("../controllers/cartController");
const { requireSignin } = require("../middleware/tokenAuth");
const { requireUserSignin } = require("../middleware/userAuth");

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: API which deals with Cart data
 */

/**
 * @swagger
 * /cart/:
 *  get:
 *      summary: Shows the cart item/s of a user
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: Displays all the products which the user has added to their cart
 */
router.get("", requireSignin, requireUserSignin, controller.listCart);
// router.get("/", requireSignin, controller.listCart);

/**
 * @swagger
 * /add-to-cart:
 *  post:
 *      summary: Adds a product to the cart
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: This API adds a selected product to the user cart
 */
router.post(
  "/add-to-cart/",
  requireSignin,
  controller.addToCart
);
// router.post("/add-to-cart", requireSignin, controller.addToCart);

/**
 * @swagger
 * /:
 *  delete:
 *      summary: API for deleting the product in the cart
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: This API is for removing the cart items from a user account.
 */
router.delete("/", requireSignin, requireUserSignin, controller.deleteCart);
// router.delete("/", requireSignin, controller.deleteCart);

module.exports = router;
