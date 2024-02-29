//This controller deals with Sign Up functionality

//Input : User's email, firstname, lastname, password

const { User } = require("../db/models/userModel");
const bcrypt = require("bcrypt");
const logger = require("../logger/logs");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user){
      logger.info(`${req.body.email} tried making an account with the same e-mail ${req.socket.remoteAddress}`)
      return res
        .status(403)
        .json({ code: 403, message: " User already registered" }); //If email already exists
    }
    if (error){
      logger.error(`Error: ${error} ${req.socket.remoteAddress}`)
      return res
        .status(400)
        .json({ code: 400, message: `Something went wrong` });
    }
    const _user = new User(req.body); 
    _user.hash_password = bcrypt.hashSync(req.body.password, 10);
    userType = req.params.userType
    if(userType) _user.user_role = userType
    _user.save((err, data) => {
      if (!err) {
        logger.info(`Successfull sign up ${req.socket.remoteAddress}`)
        res
          .status(200)
          .json({
            code: 200,
            message: "User added successfully",
            // userDetails: data,
          });
      } else {
        logger.error(`Error: ${error} ${req.socket.remoteAddress}`)
        res.status(403).json({ code: 403, message: "Something went wrong!" });
      }
    });
  });
};
