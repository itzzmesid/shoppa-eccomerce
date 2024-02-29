const {User} = require('../db/models/userModel');
const bcrypt = require("bcrypt");

// To edit user profile 
exports.profileEdit = (req, res) => {
    const userId = req.user.id;
    const userUpdate = req.body;

    User.findByIdAndUpdate({_id:userId},{$set:userUpdate}, function(err, model){
        if(err) res.status(401).json({code: 401, message:`Something went wrong 3`})
        if(model){
            console.log(model);
            return res.status(201).json({code:201, message:"User updated succesfully!"});  
        }
    })
}

// To change user password
exports.changePassword = (req,res) =>{
   User.findById(req.user.id)
   .exec((error, user)=>{
        if(error) return res.status(400).json({code:400, message:`Something went wrong`});
        if(user){
            const newPassword = req.body.newPassword;
            if(user.authenticate(req.body.oldPassword)){   //verify with the old password
                hashPassword = bcrypt.hashSync(newPassword, 10);
                User.findByIdAndUpdate({_id:req.user.id},{$set:{hash_password:hashPassword}},function(error,change){
                    if(error) return res.status(401).json({code:401, message:`Something went wrong!`});
                    if(change){
                        return res.status(200).json({code:200,message:`Password updated successfully!`})
                    }
                })
            }
        }
   })
}

//To change email
exports.changeEmail = (req, res) => {
    const mailId = req.query.email;
    const userId = req.user.id;

    User.find({email: mailId}, function(err, data){ //to find whether the email is already in use.
        if(err) res.status(401).json({code: 401, message:`Something went wrong 1`});
        if(data) {
            if(data.email == mailId) { //to check whether the new email already exist.
                return res.status(400).send("error")
            } else {
                User.findByIdAndUpdate({_id: userId}, {$set: {email: mailId}}, function(err, model){ //to save changed email
                    if(err) res.status(401).json({code:401, message:`Email updation failed!`});
                    if(model){
                        console.log(model);
                        return res.status(201).json({code:201, message:"User updated succesfully!"});  
                    }
                })
            }
        }
    })
}