import SuccessResponse from "./../../responses/successResponse";
import message from "./../../constants/message.constant";

module.exports = (req, res, next) => {
  SuccessResponse(res, message.SUCCESSFULLY, { ping: "OK" });
};
