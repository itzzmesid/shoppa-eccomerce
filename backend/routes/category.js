const express = require("express");
const {
  addCategory,
  listCategories,
  deleteCategory
} = require("../controllers/category");
const { requireAdminSignin } = require("../middleware/adminAuth");
const { requireSignin } = require("../middleware/tokenAuth");
const router = express.Router();
const upload = require("../utils/multer");

/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          properties:
 *              Id:
 *                  type: string
 *              name:
 *                  type: string
 *              slug:
 *                  type: string
 *              parentId:
 *                  type: string
 *
 */

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category managing API
 */

/**
 * @swagger
 * /category/list/:
 *  get:
 *      summary: Returns the list of categories and subcategories
 *      tags: [Category]
 *      responses:
 *          200:
 *              description: Testing Get
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Category'
 */
router.get("/list", listCategories); // View all the categories

/**
 * @swagger
 * /category/new/:
 *  post:
 *      summary: Creates a new category or subcategory
 *      tags: [Category]
 *      responses:
 *          200:
 *              description: Testing Get
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Category'
 */


router.post(
  "/new",
  requireSignin,
  requireAdminSignin,
  upload.single("categoryImage"),
  addCategory
); //Add a new category. Can be done by admin


//Delete a category by Id
router.delete("/:id", deleteCategory); ////Delete an exisiting category

module.exports = router;
