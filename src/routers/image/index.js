import express from "express";
import v1 from "./v1";

const route = express.Router();

route.get("/profile", v1.profile);

module.exports = route;
