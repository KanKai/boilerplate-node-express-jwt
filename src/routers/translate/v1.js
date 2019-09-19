const MODULE_ID = "api:translate";

import logger from "./../../utils/logger";
import SuccessResponse from "./../../responses/successResponse";
import message from "./../../constants/message.constant";
import NotFoundResponse from "./../../responses/notFoundResponse";
import InternalServerErrorResponse from "./../../responses/internalServerErrorResponse";
import { GetTranslateController } from "./../../controllers/translate/getTranslateController";

module.exports = {
  translate: async (req, res, next) => {
    logger.info(`%s: request ${MODULE_ID}`);
    try {
      const result = await new GetTranslateController().get(
        req.query.keyword,
        req.query.form_lang,
        req.query.to_lang
      );
      SuccessResponse(res, message.SUCCESSFULLY, result);
      logger.info(`%s: response ${MODULE_ID} | ${result}`);
    } catch (exceptions) {
      logger.info(`%s: error ${MODULE_ID} | ${exception.message}`);
      if (exception instanceof NotFoundException)
        NotFoundResponse(res, exception.message);
      else InternalServerErrorResponse(res, exception.message);
    }
  }
};
