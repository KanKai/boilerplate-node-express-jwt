import express from "express";
import v1 from "./v1";

const route = express.Router();

route.get("/me", v1.me);
route.post("/me/logout", v1.logout);
route.post("/me/logoutall", v1.logoutAll);

module.exports = route;
