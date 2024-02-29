
exports.requireUserSignin = (req,res,next)=>{
    if(req.user.role !== "user"){
        res.status(400).json({message:`You are not authorized to view this page`})
    }
    next();
}