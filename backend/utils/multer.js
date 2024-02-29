const shortid = require("shortid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "/upload"));
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + Date.now() + file.originalname);
  },
});

//File Validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //prevent upload
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({storage: storage,fileFilter: fileFilter,
});

module.exports = upload;
