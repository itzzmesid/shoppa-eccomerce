//This controller deals with Login functionality

const { User } = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const logger = require("../logger/logs");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    //Signing the userId and userRole to the token
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      logger.info(
        `An unregistered user tried to login ${req.socket.remoteAddress}`
      );
      return res
        .status(400)
        .json({ message: "We cannot find an account with that email address" });
    }
    if (user) {
      const { _id, email, fullName, user_role, isActive } = user;
      if (user.authenticate(req.body.password) && user.isActive == true) {
        //authenticate() matches the given creds with the database
        const token = createToken(user._id, user.user_role);
        res.cookie("token", token, { expiresIn: process.env.JWT_EXPIRE });

        res.status(200).json({
          token,
          code: 200,
          user: { _id, user_role, fullName, email, isActive },
        });
      } else {
        logger.info(
          `A user tried to login with invalid email/password ${req.socket.remoteAddress}`
        );
        return res
          .status(401)
          .json({ code: 401, message: `Invalid email/password` });
      }
    } else {
      logger.info(
        `A user tried to login with invalid email/password ${req.socket.remoteAddress}`
      );
      return res
        .status(401)
        .json({ code: 401, message: "Invalid email/password" });
    }
  });
};
