const MODULE_ID = "app:authentication:middleware";

import jwt from "jsonwebtoken";
import config from "../config";
import UnauthorizedResponse from "../responses/unauthorizedResponse";
import logger from "./../utils/logger";
import UserModel from "../models/userModel";
import message from "../constants/message.constant";
import { UnauthorizedException } from "../exceptions/unauthorizedException";

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, config.jwtSecret);
    const user = await UserModel.findOne({
      _id: data._id,
      "tokens.token": token
    });

    if (!user) {
      throw new UnauthorizedException(message.INVALID_LOGIN_CREDENTIAL);
    }

    req.user = user;
    req.token = token;
    next();
  } catch (exception) {
    logger.warn(
      JSON.stringify({ error: { appModule: MODULE_ID, message: exception } })
    );
    UnauthorizedResponse(res, exception.message);
  }
};

module.exports = AuthMiddleware;
