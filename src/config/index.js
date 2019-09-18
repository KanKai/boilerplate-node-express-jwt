require("dotenv").config();

/**
 * สร้าง prefix route paths.
 */
const API_ROOT = "/api";
const env = process.env["ENV"] || "development";

module.exports = {
  apiRoot: API_ROOT,
  ENV: env,
  LOG_LEVEL: env === "development" ? "debug" : "info",
  PORT: process.env["PORT"] || 8080,

  // key สำหรับ สร้าง/ยืนยัน jwt
  jwtSecret: process.env["JWT_SECRET"] || "&@$!plokmijn!$@&",
  jwtExpires: process.env["JWT_EXPIRES"] || "15m",
  salt: process.env["SALT"] || "&@$!qazwsxedc!$@&",
  keyLen: process.env["KEY_LEN"] || 32,
  digest: process.env["DIGEST"] || "sha512",
  dbHost: process.env["DB_HOST"],
  dbUser: process.env["USERNAME"],
  dbPass: process.env["PASSWORD"],

  // building route paths
  basePath: path => {
    return API_ROOT.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }
};
