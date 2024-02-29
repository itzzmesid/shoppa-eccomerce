const { Category } = require("../db/models/category");
const slugify = require("slugify");
const { cloudinary } = require("../utils/cloudinary");
const shortid = require("shortid");

//Recursive function to display subcategories within categories
function addNewCategory(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((catg) => catg.parentId == undefined);
  } else {
    category = categories.filter((catg) => catg.parentId == parentId);
  }

  for (let c of category) {
    categoryList.push({
      _id: c._id,
      name: c.name,
      slug: c.slug,
      children: addNewCategory(categories, c._id),
      categoryImage: c.categoryImage,
    });
  }
  return categoryList;
}

//Add a new category
exports.addCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  try {
    if (req.file) {
      var locaFilePath = req.file.path;
      console.log(req.file.path);
      var cloudinaryResponse = await cloudinary.uploader.upload(locaFilePath, {
        public_id: shortid.generate() + Date.now(),
      });
      categoryObj.categoryImage = cloudinaryResponse.url;
    }
  } catch {
    return res.send("Image upload unsuccessful!");
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const catSaveObj = new Category(categoryObj);
  catSaveObj.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

//List all categories
exports.listCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(404).json({ error });
    if (categories) {
      //const categoryList = addNewCategory(categories);
      return res.status(200).json({ categories });
    }
  });
};


exports.deleteCategory = async (req, res) => {
  let cat = await Category.findById(req.params.id);
  if (!cat) {
    return res.status(404).json({
      code: 404,
      success: false,
      message: "Category not found",
    });
  }
  await cat.remove(); //
  res.status(200).json({
    success: true,
    message: `Category with Id : ${req.params.id} removed successfully!`,
  });
};
