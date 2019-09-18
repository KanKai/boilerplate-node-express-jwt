import express from "express";
import auth from "./../middleware/authMiddleware";

const route = express.Router();

/**
 * no protect route
 */
route.use("/ping", require("./ping"));
route.use("/auth", require("./auth"));

/**
 * protect route
 */
route.use("/users", [auth, require("./user")]);

module.exports = route;
