const {Wishlist} = require('../db/models/wishlistSchema')

exports.addToWishlist = (req, res) => {
    Wishlist.findOne({ userId: req.user.id})
    .exec((error, wishlist) => {
        if(error){
            return res.status(400).json({error});
        }
        if(wishlist){
            //if wishlist already exist for a user, then add item to existing wishlist.

            const productId = req.body.wishlistItems.productId;
            const isItemAddedToWishlist = wishlist.wishlistItems.find(w => w.productId == productId);

            if(isItemAddedToWishlist){
                //if product already exist in wishlist, skip adding it again.
                res.status(200).send("Item already exist in wishlist.")
            }else{
                Wishlist.findOneAndUpdate({userId: req.user.id}, {
                    "$push": {
                        "wishlistItems": req.body.wishlistItems
                    }
                })
                .exec((error, wishlist) => {
                    if(error){
                        return res.status(400).json({error});
                    }
                    if(wishlist){
                        res.status(201).json({message: "Added to wishlist."});
                    }
                })
    
            }    
        }else{
            //if wishlist doesn't exist, then create a new wishlist.
            
            const wishlist = new Wishlist({
                userId:req.user.id,
                wishlistItems: [req.body.wishlistItems]
            });
        
            wishlist.save((error, wishlist) => {
                if(error){
                    return res.status(400).json({error});
                }
                if(wishlist){
                    return res.status(201).json({message: "Added to wishlist."});
                }
            })
        }
    });
}