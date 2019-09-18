const MODULE_ID = "api:user";

import logger from "./../../utils/logger";
import { CreateUserController } from "./../../controllers/user/createUserController";
import { GetUserController } from "./../../controllers/user/getUserController";
import message from "./../../constants/message.constant";
import SuccessResponse from "./../../responses/successResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";

module.exports = {
  /**
   * Get user detail
   */
  me: async (req, res, next) => {
    logger.info(`%s: request me ${MODULE_ID}`);
    try {
      const result = await new GetUserController().detail(req.user._id);
      SuccessResponse(
        res,
        message.GET_DETAIL_SUCCESS.replace("{args}", "user"),
        result
      );
      logger.info(`%s: response me ${MODULE_ID} $ ${JSON.stringify(result)}`);
    } catch (exception) {
      logger.info(`%s: error me ${MODULE_ID} $ ${exception.message}`);
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * User logout
   */
  logout: (req, res, next) => {
    logger.info(`%s: request logout ${MODULE_ID}`);
    console.log(req);
  },

  /**
   * User logout all devices
   */
  logoutAll: (req, res, next) => {
    logger.info(`%s: request logout all device ${MODULE_ID}`);
    console.log(req);
  }
};
