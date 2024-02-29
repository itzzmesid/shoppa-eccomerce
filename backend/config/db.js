const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      // maxPoolSize: 50,
      // wtimeoutMS: 2500,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = connectDatabase;
