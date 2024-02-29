const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const { startMetricsServer } = require("./utils/metrics");
//config
dotenv.config({ path: "config/config.env" });

//Connecting to DB
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
