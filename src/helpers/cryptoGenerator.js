import pbkdf2 from "pbkdf2";
import isJS from "is_js";
import config from "./../config";

export class CryptoGenerator {
  /**
   * CryptoGenerator constructor
   * @param {String} password
   * @param {String} hash
   */
  constructor(password, salt, hash = "") {
    this._password = password;
    this._salt = salt;
    this._hash = hash;
  }

  async cryptoSync() {
    const hashPassword = await pbkdf2.pbkdf2Sync(
      this._password,
      this._salt,
      1,
      parseInt(config.keyLen),
      config.digest
    );
    return hashPassword.toString("hex");
  }

  async cryptoCompareSync() {
    let hashPassword = await pbkdf2.pbkdf2Sync(
      this._password,
      this._salt,
      1,
      parseInt(config.keyLen),
      config.digest
    );
    hashPassword = hashPassword.toString("hex");
    return isJS.equal(hashPassword, this._hash);
  }
}
