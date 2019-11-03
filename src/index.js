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
import useragent from "express-useragent";
import loggerMiddleware from "./middleware/loggerMiddleware";
import {
  preUploadProduct,
  preUploadProfile
} from "./middleware/preUploadMiddleware";
import { UploadFileDisk } from "./helpers/uploadFile";
import path from "path";

logger.info(JSON.stringify({ initial: { appModule: MODULE_ID } }));

global.rootPath = path.join(path.dirname(require.main.filename));

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
  app.use("/api/v1/version", async (req, res) => {
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
  app.use(useragent.express());
  app.use(loggerMiddleware);

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
      logger.info(
        JSON.stringify({
          connectDB: {
            appModule: MODULE_ID,
            status: "connect db successfully!"
          }
        })
      );
    } catch (error) {
      logger.error(
        JSON.stringify({ error: { appModule: MODULE_ID, message: error } })
      );
      throw new Error(error);
    }

    logger.info(
      JSON.stringify({
        initial: {
          appModule: MODULE_ID,
          message: `listening on PORT ${config.PORT}`
        }
      })
    );

    appRouting();
  });
} catch (exception) {
  logger.error(
    JSON.stringify({
      error: {
        appModule: MODULE_ID,
        message: `API Cannot Start. ${exception.message}`
      }
    })
  );
}

module.exports = app;
