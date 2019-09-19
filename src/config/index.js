import path from "path";

require("dotenv").config({
  path: path.join(__dirname, `../../.env.${process.env["NODE_ENV"]}`)
});

/**
 * สร้าง prefix route paths.
 */
const API_ROOT = "/api";
const env = process.env["NODE_ENV"] || "development";

module.exports = {
  apiRoot: API_ROOT,
  ENV: env,
  LOG_LEVEL: env === "development" ? "debug" : "info",
  PORT: process.env["PORT"] || 8080,

  // key สำหรับ สร้าง/ยืนยัน jwt
  jwtSecret: process.env["JWT_SECRET"],
  jwtExpires: process.env["JWT_EXPIRES"],
  salt: process.env["SALT"],
  keyLen: process.env["KEY_LEN"],
  digest: process.env["DIGEST"],
  dbHost: process.env["DB_HOST"],
  dbUser: process.env["USERNAME"],
  dbPass: process.env["PASSWORD"],

  // building route paths
  basePath: path => {
    return API_ROOT.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }
};
