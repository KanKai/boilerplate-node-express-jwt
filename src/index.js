const MODULE_ID = "app:main";

// [1] importing the dependencies or others
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./configs";
import logger from "./utils/logger";
import { MongoConnector } from "./database/mongoConnector";

logger.info(`%s: initializing ${MODULE_ID}`);

// [2] defining the express app
const app = express();

/**
 * [5] Connect to mongoDB
 * connect to db
 */

(async function() {
  try {
    await new MongoConnector(
      config.dbHost,
      config.dbUser,
      config.dbPass
    ).connect();
    logger.info(`%s: ready ${MODULE_ID}. connect db successfully!`);
  } catch (error) {
    logger.info(
      `%s: ready ${MODULE_ID}. An error occurred while connecting to DB!`
    );
    throw new Error(err);
  }
})();

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
