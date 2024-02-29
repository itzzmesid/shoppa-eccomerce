const {Wishlist} = require('../db/models/wishlistSchema')

exports.deleteWishlist = (req, res) => {
    try{
        Wishlist.findById(req.params.id)
        .exec((error, data) => {
            if(error) return res.status(500).send("Couldn't delete wishlist!");
            if(data){
                res.status(200).json({message:'Wishlist deleted.'});
            }
        })
    } catch(e) {
        res.status(500).send("Couldn't delete wishlist!");
        console.error(e)
    }
}
