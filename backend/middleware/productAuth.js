// const jwt = require('jsonwebtoken');

// Permission to add new product 
// Only vendor and admins can add product
exports.requireProductPermission = (req, res, next) =>{
    try{
        // const token = req.headers.authorization.split(" ")[1];
        // const user = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = user;
        if(req.user.role === 'admin' || req.user.role === 'vendor'){
            next();
        } else{
            res.status(401).json({message:`You don't have the access to view this page`})
        }
    }catch (e){
        res.status(400).json({message:`Something went wrong`})
        console.error(e);
    }
}
