const { User } = require("../db/models/userModel");
const logger = require("../logger/logs");

exports.removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id).exec((error, data) => {
    if (error){
        logger.error()
        return res.status(400).json({ error, message: `Something went wrong!` });
    }
      
    if (data) {
      res.status(201).json({ message: `User removed successfully` });
    } else {
      res.status(401).json({ message: `User doesn't exist` });
    }
  });
};
