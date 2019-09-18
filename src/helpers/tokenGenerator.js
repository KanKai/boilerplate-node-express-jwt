import jwt from "jsonwebtoken";
import config from "./../config";

export class TokenGenerator {
  /**
   * TokenGenerator constructor
   * @param {any} data
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * Generate token
   *
   * @returns {any}
   */
  generate() {
    console.log("config.JWT_EXPIRES -> ", config.JWT_EXPIRES);
    return jwt.sign(this._data, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES // token จะหมดอายุใน 200 นาที
    });
  }
}
