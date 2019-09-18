const MODULE_ID = "app:main";

// [1] importing the dependencies or others
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./configs";
import logger from "./utils/logger";
import { MongoConnector } from "./helpers/mongoConnector";

logger.info(`%s: initializing ${MODULE_ID}`);

// [2] defining the express app
const app = express();

/**
 * [5] Connect to mongoDB
 * set mongoose default promise
 * connect to db
 */
mongoose.Promise = global.Promise;
new MongoConnector(config.dbHost, config.dbUser, config.dbPass).connect().then(
  _ => {
    logger.info(`%s: ready ${MODULE_ID}. connect db successfully!`);
  },
  err => {
    logger.info(
      `%s: ready ${MODULE_ID}. An error occurred while connecting to DB!`
    );
    throw new Error(err);
  }
);

/**
 * [3] adding middleware
 * adding Helmet to enhance your API's security
 * using bodyParser to parse JSON bodies into JS objects
 * enabling CORS for all requests
 * enabling morgan to log HTTP requests
 */
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

/**
 * Testing call api
 */
app.get("/test", (req, res) => {
  res.json({
    status: `Hello World API's`
  });
});

// [4] Starting server
app.listen(config.PORT, () => {
  logger.info(`%s: ready ${MODULE_ID}. listening on PORT ${config.PORT}`);
});

module.exports = app;
