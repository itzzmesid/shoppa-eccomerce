const {Wishlist} = require('../db/models/wishlistSchema')

exports.removeItemFromWishlist =  async(req,res) => {     
    try {
        const userId = req.user.id;
        const product_id = req.query.productId;
        
        Wishlist.findOne({userId: userId}) //find wishlist id by using user id

        .exec((error, wishlist) => {            
            if(error){
                return res.status(401).json({error});
            }
            if(wishlist){  //finding a product using product id from wishlist
                Wishlist.findOneAndUpdate({userId: userId}, {
                    $pull: {
                        wishlistItems: {productId : product_id}
                    }
                })  
                .exec((error, data) => {
                    if(error){
                        return res.status(400).json({message: "error!"});
                    }
                    if(data){

                        return res.status(200).json({ message: `Item deleted.`})
                    } else {
                        return res.status(200).json({ message: `Item not found.`})   

                    }
                })
            }
        })    
    } catch (error) {
        return res.status(400).send("Deletion failed.")

    }
} 
