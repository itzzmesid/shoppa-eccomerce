const jwt = require('jsonwebtoken');

// Middleware to ensure admin is logged in or not
exports.requireAdminSignin = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        if(req.user.role === 'admin'){
            console.log(req.user.role);
            next();
        } else{
            res.status(401).json({code:401,message:`You don't have the access to view this page`})
        }
    }catch (e){
        res.status(400).json({code:400,message:`Something went wrong`})
        console.error(e);
    }
}
