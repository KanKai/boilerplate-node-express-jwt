import express from "express";
import auth from "./../middleware/authMiddleware";
import roleConfig from "./../constants/role.constant";
import { allowOnly } from "./../middleware/allowMiddleware";

const route = express.Router();

/**
 * no protect route
 */
route.use("/ping", [require("./ping")]);
route.use("/auth", [require("./auth")]);
route.use("/translate", [require("./translate")]);

/**
 * protect route
 */
route.use("/users", [
  auth,
  allowOnly(roleConfig.accessLevel.user, require("./user"))
]);

route.use("/images", [
  auth,
  allowOnly(roleConfig.accessLevel.guest),
  require("./image")
]);

module.exports = route;
