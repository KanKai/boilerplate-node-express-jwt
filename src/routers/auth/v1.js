const MODULE_ID = "app:auth";

import SuccessResponse from "./../../responses/successResponse";
import UnauthorizedResponse from "./../../responses/unauthorizedResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";
import { LoginController } from "./../../controllers/auth/loginController";
import message from "./../../constants/message.constant";
import { UnauthorizedException } from "../../exceptions/unauthorizedException";
import { RegisterController } from "./../../controllers/auth/registerController";
import logger from "./../../utils/logger";

module.exports = {
  /**
   * Login a registered user
   */
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await new LoginController(
        email,
        password,
        req.useragent
      ).login();
      SuccessResponse(res, message.LOGIN_SUCCESS, result);
    } catch (exception) {
      logger.error(
        JSON.stringify({
          error: {
            appModule: MODULE_ID,
            message: exception.message
          }
        })
      );
      if (exception instanceof UnauthorizedException)
        UnauthorizedResponse(res, exception._message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * Create new user
   */
  register: async (req, res, next) => {
    try {
      const result = await new RegisterController(req.body).store();
      SuccessResponse(
        res,
        message.CREATE_SUCCESS.replace("{args}", "user"),
        result
      );
    } catch (exception) {
      logger.error(
        JSON.stringify({
          error: {
            appModule: MODULE_ID,
            message: exception.message
          }
        })
      );
      InternalServerErrorResponse(res, exception.message);
    }
  }
};
