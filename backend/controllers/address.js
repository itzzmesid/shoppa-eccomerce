const { Address } = require("../db/models/address");
const logger = require("../logger/logs");
// To add new address and to edit existing address
exports.addAddress = (req, res) => {
  const { customerAddress } = req.body;
  if (customerAddress.address) {
    if (customerAddress.address._id) {
      Address.findOneAndUpdate(
        //To update address
        { user: req.user.id, "address._id": customerAddress.address._id },
        {
          $set: {
            "address.$": customerAddress.address,
          },
        }
      ).exec((error, address) => {
        if (error) {
          logger.error(error); //Log the error
          console.log(error);
          return res.status(400).json({ message: "Error" });
        }
        if (address) {
          return res
            .status(201)
            .json({ message: "Address updated succesfully" });
        }
      });
    } else {
      Address.findOneAndUpdate(
        //To add new address
        { user: req.user.id },
        {
          $push: {
            address: customerAddress.address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) {
          logger.error(error); //Log the error
          console.log(error);
          return res.status(400).json({ message: "Error" });
        }
        if (address) {
          console.log(address);
          return res.status(201).json({ message: "Address Added succesfully" });
        }
      });
    }
  } else {
    logger.error("User didn't enter all the fields while adding an address");
    return res.status(400).json({ error: "please fill required fields" });
  }
};

// To get all address of a user
exports.getAddress = async (req, res) => {
  let userId = req.user.id;
  await Address.find({ user: userId }).exec((error, data) => {
    if (error){
      logger.error(`User with id ${userId} was not found while getting all his address! `)
      return res.status(400).json({ code: 400, message: "User not found!" });

    }if (data) {
      if (data.length == 0) {
        return res.status(200).json({ code: 200, message: `No address found` });
      }
      // else{
      //   var addressData = data[0].address;
      // addressData[0].isDefault = true; //To make the first address as default
      // }
      return res.status(200).json({ code: 200, data: data[0].address });
    }
  });
};

// to remove an address
exports.removeAddress = async (req, res) => {
  await Address.find({ user: req.user.id }) //if user address exist in database
    .exec((error, addressData) => {
      if (error){
        logger.error(`User with id ${userId} was not found while removing his address!`)
        return res.status(400).json({ code: 400, message: "User not found!" });
      }
      if (addressData) {
        Address.findByIdAndUpdate(addressData[0].id, {
          $pull: {
            address: { _id: req.params.id }, //req.params.id contains the id of address to be removed
          },
        }).exec((error, data) => {
          if (error)
            return res
              .status(400)
              .json({ code: 400, message: "Address not found!" });
          if (data)
            return res
              .status(200)
              .json({ code: 200, message: "Address removed successfully" });
        });
      }
    });
};
