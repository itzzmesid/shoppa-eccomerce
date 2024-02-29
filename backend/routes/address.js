const express = require("express");
const {
  addAddress,
  getAddress,
  removeAddress,
} = require("../controllers/address");
const { requireSignin } = require("../middleware/tokenAuth");
const { requireUserSignin } = require("../middleware/userAuth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Address
 *  description: Address managing API
 */

/**
 * @swagger
 * /address/get:
 *  get:
 *      summary: API for displaying the addresses of the user
 *      tags: [Address]
 *      responses:
 *          200:
 *              description: A user can have multiple addresses. This can list all the addresses.
 */
router.get("/", requireSignin, requireUserSignin, getAddress);

/**
 * @swagger
 * /address/new:
 *  post:
 *      summary: API for creating a new address for the user
 *      tags: [Address]
 *      responses:
 *          200:
 *              description: Creates a new address for the user
 */
router.post("/", requireSignin, requireUserSignin, addAddress);

router.delete("/:id", requireSignin, requireUserSignin, removeAddress);

module.exports = router;
