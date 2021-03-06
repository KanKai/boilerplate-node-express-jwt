import express from "express";
import v1 from "./v1";

const route = express.Router();

route.post("/login", v1.login);
route.post("/register", v1.register);

module.exports = route;
