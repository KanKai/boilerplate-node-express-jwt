const MODULE_ID = "app:auth";

import logger from "./../../utils/logger";
import SuccessResponse from "./../../responses/successResponse";
import UnauthorizedResponse from "./../../responses/unauthorizedResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";
import { LoginController } from "./../../controllers/auth/loginController";
import message from "./../../constants/message.constant";
import { UnauthorizedException } from "../../exceptions/unauthorizedException";
import { RegisterController } from "./../../controllers/auth/registerController";

module.exports = {
  /**
   * Login a registered user
   */
  login: async (req, res, next) => {
    logger.info(`%s: request login ${MODULE_ID}`);
    try {
      const { email, password } = req.body;
      const result = await new LoginController(
        email,
        password,
        req.useragent
      ).login();
      SuccessResponse(res, message.LOGIN_SUCCESS, result);
      logger.info(
        `%s: response login ${MODULE_ID} $ ${JSON.stringify(result)}`
      );
    } catch (exception) {
      logger.info(`%s: error login ${MODULE_ID} $ ${exception.message}`);
      if (exception instanceof UnauthorizedException)
        UnauthorizedResponse(res, exception._message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * Create new user
   */
  register: async (req, res, next) => {
    logger.info(`%s: request register ${MODULE_ID}`);
    try {
      const result = await new RegisterController(req.body).store();
      SuccessResponse(
        res,
        message.CREATE_SUCCESS.replace("{args}", "user"),
        result
      );
      logger.info(
        `%s: response register ${MODULE_ID} $ ${JSON.stringify(result)}`
      );
    } catch (exception) {
      logger.info(`%s: error register ${MODULE_ID} $ ${exception.message}`);
      InternalServerErrorResponse(res, exception.message);
    }
  }
};
