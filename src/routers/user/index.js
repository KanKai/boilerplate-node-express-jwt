import express from "express";
import v1 from "./v1";
import { preUploadProfile } from "./../../middleware/preUploadMiddleware";
import { UploadFileDisk } from "./../../helpers/uploadFile";

const route = express.Router();

route.get("/me", v1.me);
route.patch("/me", v1.update);
route.post("/me/logout", v1.logout);
route.post("/me/logoutall", v1.logoutAll);

module.exports = route;
