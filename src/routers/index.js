import express from "express";

const route = express.Router();

/**
 * no protect route
 */
route.use("ping", require("./ping/v1"));
route.use("/auth", require("./auth"));

route.use("/users", require("./user"));

module.exports = route;
