const jwt = require('jsonwebtoken');

// To check whether Token is generated or not 
// To ensure sign in
exports.requireSignin = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch(e){
        res.status(404).json({code:404,message:`Please sign in`})
        console.error(e);
    }
}