const MODULE_ID = "api:translate";

import logger from "./../../utils/logger";
import SuccessResponse from "./../../responses/successResponse";
import message from "./../../constants/message.constant";
import NotFoundResponse from "./../../responses/notFoundResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";
import { GetTranslateController } from "./../../controllers/translate/getTranslateController";

module.exports = {
  translate: async (req, res, next) => {
    try {
      const result = await new GetTranslateController().get(
        req.query.keyword,
        req.query.form_lang,
        req.query.to_lang
      );
      SuccessResponse(res, message.SUCCESSFULLY, result);
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
