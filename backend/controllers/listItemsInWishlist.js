const {Wishlist} = require('../db/models/wishlistSchema')

exports.listFromWishlist = (req, res) => {
    try {
        Wishlist.findOne({userId: req.user.id})
        .exec((error,data) => {
            if(error) return res.status(400).send("Something went wrong");
            if(data){
                return res.status(200).json({message:'Wishlist',Items: data});
            }
        })
    } catch(e) {
        res.status(400).send("Error");
    }
}
