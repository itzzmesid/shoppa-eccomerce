const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { specs, swaggerUi } = require("./utils/swagger");
const path = require("path");
const { router } = require("./routes/product");


app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

//app.use(express.urlencoded({ limit: "50mb", extended: true }));

//app.use(express.static(path.join(__dirname, "upload"))); //to view images in browser. Eg - http://localhost:3000/wzgY169Xk1668404988185realme.png
app.use(cors());

app.use(morgan("short")); //for logs

//Routes

//Landing page. Has both categories and products
app.use("/", require("./routes/landingData"));

//Customer Sign Up
app.use("/signup", require("./routes/signup"));

//Customer Login
app.use("/account/signin", require("./routes/signin"));

//Customer Sign Out
app.use("/signout", require("./routes/signout"));

//Category routes -> Add,view and delete categories
app.use("/category", require("./routes/category"));

//Cart routes -> Add, view, delete products
app.use("/cart", require("./routes/cart"));

app.use("/wishlist", require("./routes/wishlist"));

app.use("/product", router); //Product route

app.use("/checkout", require("./routes/checkout"));

app.use("/address", require("./routes/address"));

app.use("/admin", require("./routes/remove"));

app.use("/vendor", require("./routes/vendor"));

app.use("/payment", require("./routes/payment"));

app.use("", require("./routes/listUser"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); //Swagger route

app.use("/edit-profile", require("./routes/editProfile"));

app.use("/admin", require("./routes/userDisable"));

app.use("/order", require("./routes/orderStatus"));

app.use("/account/order-history", require("./routes/orderHistory"));

// app.use("/metrics", require("./routes/metricRoutes"));



module.exports = app;
