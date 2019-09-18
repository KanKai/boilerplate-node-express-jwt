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
    return jwt.sign(this._data, config.jwtSecret, {
      expiresIn: config.jwtExpires // token จะหมดอายุใน 200 นาที
    });
  }
}
