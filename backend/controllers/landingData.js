const { Category } = require("../db/models/category");
const { Product } = require("../db/models/product");

exports.landingData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({ isActive: true })

    .select(
      "_id productName productPrice slug description productPictures category"
    )
    .populate({ path: "category", select: "_id name parentId" })
    .exec()
  res.status(200).json({ categories, products });
};
