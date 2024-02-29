const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,                         
    },
    cartItems: [{
              productId: { type :String},   //TODO: to be replaced by product id from product table
              vendorId : {type : String},
              productPictures:[
                {img : {type:String}}
              ],
              productName : { type :String},
              productPrice : { type : Number},
              quantity : { type : Number},
      
                }],
    totalPrice : { 
      type : Number
    },            
  }, {
    versionKey: false , timestamps : true
});
const Cart = mongoose.model("shopping_cart_item", cartSchema);

module.exports = {Cart};



