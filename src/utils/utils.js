export class Utils {
  /**
   *
   * @param {String} str
   * @param {Object} mapObj {apple: mango}
   */
  static replaceStrAll(str, mapObj) {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi");

    return str.replace(re, matched => {
      return mapObj[matched];
    });
  }

  /**
   * Replace Object to ****
   *
   * @param {Object} reqBody
   */
  static replaceSecretObj(reqBody) {
    const selectField = ["password", "token"];

    for (let key of selectField) {
      if (reqBody.hasOwnProperty(key) && key === "password") {
        reqBody[key] = "*****";
      }
    }

    return reqBody;
  }
}
