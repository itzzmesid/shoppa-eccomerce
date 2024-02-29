const mongoose = require("mongoose")
const wishlistSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    wishlistItems: [
        {
            productId : {
                type:mongoose.Schema.Types.ObjectId,ref:'Product'
            }
        }
    ]
}, {timestamps: true});

const Wishlist = new mongoose.model('wishlist', wishlistSchema);
module.exports = {Wishlist}