const MODULE_ID = "api:hello";

import logger from "./../../utils/logger";
import SuccessResponse from "./../../responses/successResponse";
import message from "./../../constants/message.constant";

module.exports = (req, res, next) => {
  logger.info(`%s: request received ${MODULE_ID}`);

  SuccessResponse(res, message.SUCCESSFULLY, { ping: "OK" });

  logger.info(`%s: response sent ${MODULE_ID}`);
};
