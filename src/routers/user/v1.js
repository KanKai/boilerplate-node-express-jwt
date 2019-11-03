const MODULE_ID = "api:user";

import { GetUserController } from "./../../controllers/user/getUserController";
import message from "./../../constants/message.constant";
import SuccessResponse from "./../../responses/successResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";
import { LogoutController } from "../../controllers/auth/logoutController";
import logger from "./../../utils/logger";

module.exports = {
  /**
   * Get user detail
   */
  me: async (req, res, next) => {
    try {
      const result = await new GetUserController().detail(req.user._id);
      SuccessResponse(
        res,
        message.GET_DETAIL_SUCCESS.replace("{args}", "user"),
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
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * Update user profile
   */
  update: async (req, res, next) => {
    try {
      console.log("req.user -> ", req.user);
      console.log("req -> ", req);
      res.json("success");
    } catch (exception) {
      console.log("exception -> ", exception);
      logger.error(
        JSON.stringify({
          error: {
            appModule: MODULE_ID,
            message: exception.message
          }
        })
      );
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * User logout
   */
  logout: async (req, res, next) => {
    try {
      await new LogoutController(req).logout();
      SuccessResponse(res, message.LOGOUT_SUCCESS);
    } catch (exception) {
      logger.error(
        JSON.stringify({
          error: {
            appModule: MODULE_ID,
            message: exception.message
          }
        })
      );
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  },

  /**
   * User logout all devices
   */
  logoutAll: async (req, res, next) => {
    try {
      await new LogoutController(req).logoutAll();
      SuccessResponse(res, message.LOGOUT_ALL_SUCCESS);
    } catch (exception) {
      logger.error(
        JSON.stringify({
          error: {
            appModule: MODULE_ID,
            message: exception.message
          }
        })
      );
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  }
};
