const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shoppa REST APIs",
      version: "1.0.0",
      description: "API Library for Shoppa - Eccomerce App",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["/home/dxuser/Desktop/eCommerce_App/routes/*.js"],
};
const specs = swaggerJsDoc(options);
module.exports = { specs, swaggerUi };
 