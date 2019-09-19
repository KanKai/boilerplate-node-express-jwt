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
}
