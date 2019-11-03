import { createLogger, format, transports } from "winston";
import config from "../config";
import fs from "fs";
import path from "path";

require("winston-daily-rotate-file");

const logDir = "log";

/**
 * Create the log directory if it does not exist
 */
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * ทำการ zip file ถ้าขึ้นวันใหม่
 */
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "1d"
});

const logger = createLogger({
  level: config.LOG_LEVEL,
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(
      info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ],
  exitOnError: false
});

module.exports = logger;