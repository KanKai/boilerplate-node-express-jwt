const MODULE_ID = "api:image";

import message from "./../../constants/message.constant";
import SuccessResponse from "./../../responses/successResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";
import logger from "./../../utils/logger";

module.exports = {
  profile: async (req, res, next) => {
    try {
      console.log("req.user -> ", req.user);
      console.log("req -> ", req);
      SuccessResponse(res, message.SUCCESSFULLY, {});
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
