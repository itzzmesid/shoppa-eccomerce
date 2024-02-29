const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

// mongoose.connect("mongodb://10.10.1.147:27017/dexcart", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Schema definition
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      // lowercase: true,
      //trim:true,  //to remove white spaces
      min: 3,
      max: 20,
    },
    last_name: {
      type: String,
      required: true,
      // lowercase: true,
      //trim:true,  //to remove white spaces
      min: 3,
      max: 20,
    },
    hash_password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      min: 10,
      // required: true,
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    user_role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

// To encrypt password
// userSchema.virtual("password").set(function (password) {
//   this.hash_password = bcrypt.hashSync(password, 10);
// });

// To decrypt password
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

// To get full name
userSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model("USER", userSchema);

module.exports = { User };
