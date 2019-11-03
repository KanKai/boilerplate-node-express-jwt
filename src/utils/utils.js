import crypto from "crypto";
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
    const selectField = ["password"];

    for (let key of selectField) {
      if (reqBody.hasOwnProperty(key)) {
        switch (key) {
          case "password":
            reqBody[key] = "*****";
            break;
          default:
            break;
        }
      }
    }
    return reqBody;
  }

  /**
   * Ignore Images paths
   *
   * @param {Array} routes
   */
  static ignoreImageRoute(routes = [], path) {
    return routes.indexOf(path) < 0 ? true : false;
  }

  /**
   * Random Bytes Base64
   */
  static randomBytes() {
    const buf = crypto.randomBytes(16).toString("base64");
    return buf;
  }
}
