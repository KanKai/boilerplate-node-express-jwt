import express from "express";
import v1 from "./v1";

const route = express.Router();

route.get("/", v1);

module.exports = route;
