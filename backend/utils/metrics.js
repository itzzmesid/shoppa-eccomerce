// const express = require("express");
const app = require("../app");
const client = require("prom-client");

function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log().info("Running at 9100");
  });
}
