const { Product } = require("../db/models/product");
const { Category } = require("../db/models/category");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");
const { cloudinary } = require("../utils/cloudinary");
const shortid = require("shortid");
const logger = require("../logger/logs");

//=================================================
// To insert new product details
//=================================================
exports.createProduct = async (req, res) => {
  const {
    name,
    detailHeader,
    price,
    category,
    description,
    stock,
    tag,
    key,
    value,
  } = req.body;

  var extractedCategoryName = await Category.findById(category);
  extractedCategoryName = extractedCategoryName.name;

  // //Insert product picture
  var productPictures = [];
  if (req.files.length > 0) {
    for (var i = 0; i < req.files.length; i++) {
      var locaFilePath = req.files[i].path;
      var cloudinaryResponse = await cloudinary.uploader.upload(locaFilePath, {
        //upload to cloudinary
        public_id: shortid.generate() + Date.now(),
      });
      productPictures.push({ img: cloudinaryResponse.url });
    }
  } else {
    return res.json({ message: "Image not found" });
  }

  // Insert data into product schema

  const product = new Product({
    productName: name,
    detailHeader,
    productPrice: price,
    category,
    categoryName: extractedCategoryName,
    description,
    stock,
    productPictures,
    productTags: { tag },
    product_spec: { key, value },
    slug: slugify(name),
    productSoldBy: req.user.id, //to get seller id from User table
  });

  // console.log(product.productPictures);
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      logger.info(`New product ${req.name} added ${req.socket.remoteAddress}`);
      res.status(201).json({ message: "Product added successfully ", product });
    }
  });
};

//=================================================
//To list product by slug
//=================================================
exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          console.log(error);
          if (error) res.status(400).json(error);
          if (products) {
            res.status(200).json({ products });
          }
        });
      }
    });
};

//=================================================
//To list all products in customer page.
//=================================================
exports.getAllProducts = async (req, res) => {
  const productsCount = await Product.countDocuments();
  const resultPerPage = 100;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  // products = await products.find({isActive:true})

  const getActiveProducts = await products.filter(
    (product) => product.isActive == true
  );
  console.log(req.ip);
  return res.status(200).json({
    success: true,
    getActiveProducts, //products, //get only active products
    productsCount,
  });
};

//=================================================
//Update a product by Id
//=================================================
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  //console.log(product.id);
  if (!product) {
    return res.status(404).json({
      code: 404,
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    code: 200,
    success: true,
    product,
  });
};

//=================================================
//Delete a product by Id
//=================================================
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(req.user.id, req.user.role, productId);

  let product = await Product.findOne({
    $and: [
      {
        productId,
        productSoldBy: req.user.id,
      },
    ],
  });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: `Product with Id : ${req.params.id} removed successfully!`,
  });
};

//=================================================
//Get details of a specific product (By Id)
//=================================================

exports.getProductById = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

//=================================================
//To enable/disable product
//=================================================

exports.activateProduct = async (req, res) => {
  const productId = req.params.id;
  await Product.findById(productId).exec((error, data) => {
    if (error)
      return res.status(404).json({ code: 404, message: `Product not found` });
    if (data) {
      const activateStatus = data.isActive; // to store the current status of product
      Product.findByIdAndUpdate(
        productId,
        { $set: { isActive: !activateStatus } },
        function (error, product) {
          if (error)
            return res.status.json({
              code: 404,
              message: `Something went wrong`,
            });
          if (product) {
            //product is enabled/disabled
            if (product.isActive == true) {
              return res
                .status(200)
                .json({ code: 200, message: `Product disabled sucessfully` });
            } else {
              return res
                .status(200)
                .json({ code: 200, message: `Product enabled sucessfully` });
            }
          }
        }
      );
    }
  });
};
