
// const client = require("prom-client");

// exports.serverMetrics = () => {
//   let register = new client.Registry();

//   const userSignUpCount = new client.Counter({
//     name: "signup_count",
//     help: "Total user signups",
//   });

//   register.registerMetric(this.userSignUpCount);
//   register.setDefaultLabels({
//     app: "shoppa-api",
//   });

//   client.collectDefaultMetrics({ register });
// };
