const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
// const remoteIp = request.socket.remoteAddress

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]  ${message}`;
});

const shoppaLogger = () => {
  return createLogger({
    level: "info",
    //level: "debug",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
    //defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      //   new winston.transports.File({ filename: "error.log", level: "error" }),
      //   new winston.transports.File({ filename: "combined.log" }),
      new transports.File({
        // filename: "/home/dxuser/Shoppa-Logs/shoppalogs.log",
        filename: "./shoppa-logs/shoppalogs.log",
        // filename: "/home/sid/work/shoppa-docker/shoppa-logs/shoppalogs.log"
      }),
    ],
  });
};

module.exports = shoppaLogger;
