const { User } = require("../db/models/userModel")
const logger = require("../logger/logs");

exports.userActivate = (req,res) =>{
    User.findOne({email: req.body.email})
    .exec((error, user)=>{
        if(error) {
            logger.error(`${error} ${req.socket.remoteAddress}`)
            return res.status(404).json({code:404,message:`User doesn't exist`});}
        if(user){
            const activated = user.isActive; 
            User.findOneAndUpdate({email: req.body.email},{$set:{isActive:!activated}},function(error,data){
                if(error) return res.status(403).json({code:403,message:`User doesn't exist`});
                if(data){
                    return res.status(200).json({code:200});
                }
            })
        }
    })
}