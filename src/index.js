const MODULE_ID = "app:main";

// [1] importing the dependencies or others
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import logger from "./utils/logger";
import { MongoConnector } from "./database/mongoConnector";

logger.info(`%s: initializing ${MODULE_ID}`);

// [2] defining the express app
const app = express();

const appRouting = () => {
  /**
   * Call routes
   */
  app.use(config.apiRoot, require("./routers"));

  /**
   * Testing call api
   */
  app.use("/api/v1/version", (req, res) => {
    const packageFile = require("./../package.json");
    res.json({
      version: packageFile.version
    });
  });
};

try {
  /**
   * [3] adding middleware
   * adding Helmet to enhance your API's security
   * using bodyParser to parse JSON bodies into JS objects
   * enabling CORS for all requests
   * enabling morgan to log HTTP requests
   */
  app.enable("trust proxy");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    helmet({
      noCache: true
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("combined"));

  // [4] Starting server
  app.listen(config.PORT, async () => {
    /**
     * [5] Connect to mongoDB
     * connect to db
     */

    try {
      await new MongoConnector(
        config.dbHost,
        config.dbUser,
        config.dbPass
      ).connect();
      logger.info(`%s: ready ${MODULE_ID}. connect db successfully!`);
    } catch (error) {
      logger.error(
        `%s: ready ${MODULE_ID}. An error occurred while connecting to DB!`
      );
      throw new Error(err);
    }

    logger.info(`%s: ready ${MODULE_ID}. listening on PORT ${config.PORT}`);

    appRouting();
  });
} catch (exception) {
  logger.error(`%s: API Cannot Start. ${exception.message}`);
}

module.exports = app;
