const MODULE_ID = "api:hello";

import logger from "./../../utils/logger";

module.exports = (req, res, next) => {
  logger.info(`%s: request received ${MODULE_ID}`);
  logger.info(`%s: response sent ${MODULE_ID}`);
  res.json({ ping: "Success!" });
};
