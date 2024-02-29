exports.vendorVerification = (req,res,next)=>{
    if(req.user.role !== "vendor"){
        res.status(400).json({message:`Access denied`})
    }
    next();
}