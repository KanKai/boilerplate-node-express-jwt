import pbkdf2 from "pbkdf2";
import isJS from "is_js";
import config from "./../config";

export class CryptoGenerator {
  /**
   * CryptoGenerator constructor
   * @param {String} password
   * @param {String} hash
   */
  constructor(password, hash = "") {
    this._password = password;
    this._hash = hash;
  }

  async cryptoSync() {
    const hashPassword = await pbkdf2.pbkdf2Sync(
      this._password,
      config.salt,
      1,
      parseInt(config.keyLen),
      config.digest
    );
    return hashPassword.toString("hex");
  }

  async cryptoCompareSync() {
    let hashPassword = await pbkdf2.pbkdf2Sync(
      this._password,
      config.salt,
      1,
      parseInt(config.keyLen),
      config.digest
    );
    hashPassword = hashPassword.toString("hex");
    return isJS.equal(hashPassword, this._hash);
  }
}
