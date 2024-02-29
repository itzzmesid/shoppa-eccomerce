const shoppaLogger = require("./shoppaLogger");

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = shoppaLogger();
}

module.exports = logger;
