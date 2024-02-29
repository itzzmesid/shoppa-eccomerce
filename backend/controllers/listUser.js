const { User } = require("../db/models/userModel");
const logger = require("../logger/logs");

exports.getUser = (req, res) => {
  usertype = req.params.userType;
  User.find({ user_role: usertype }).exec((error, user) => {
    if (error) {
      logger.error(`${error} ${req.socket.remoteAddress}`);
      return res.status(400).json({ error });
    }
    if (user) {
      res.status(201).json({ user });
    }
  });
};
