const express = require("express");
const router = express.Router();
const { landingData } = require("../controllers/landingData");

/**
 * @swagger
 * tags:
 *  name: LandingData
 *  description: Landing page data API
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: API for displaying data to the landing page
 *      tags: [LandingData]
 *      responses:
 *          200:
 *              description: When a user lands at the root URL , here for example localhost:3000/ , this is the data they will see.
 */
router.get("", landingData);

module.exports = router;
