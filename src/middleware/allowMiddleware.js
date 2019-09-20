import message from "./../constants/message.constant";
import successResponse from "../responses/successResponse";

/**
 * allow permission
 */
exports.allowOnly = function(accessLevel, callback) {
  function checkUserRole(req, res) {
    if (!(accessLevel & req.user.role)) {
      successResponse(res, message.INVALID_LOGIN_CREDENTIAL, null);
      return;
    }

    callback(req, res);
  }

  return checkUserRole;
};
