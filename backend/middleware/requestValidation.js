const {validationResult } = require('express-validator');

// To check whether validator data
exports.isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length >0){
        return res.status(400).json({error : errors.array()[0].msg})
    }
    next();
}