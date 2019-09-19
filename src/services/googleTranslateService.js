"use strict";

import config from "./../config";
import { Utils } from "./../utils/utils";
import request from "request";

export class GoogleTranslateService {
  /**
   * GoogleTranslateService constructor
   * @param {String} sentences
   * @param {String} from_lang
   * @param {String} to_lang
   */
  constructor(sentences, from_lang = "th", to_lang = "en") {
    this._sentences = sentences.replace(/\n/g, "<br>");
    this._from_lang = from_lang;
    this._to_lang = to_lang;
  }

  /**
   * Translate text
   *
   * @returns {Promise<T>}
   */
  translate() {
    const mapObj = {
      "{{form_lang}}": this._from_lang,
      "{{to_lang}}": this._to_lang,
      "{{sentences}}": encodeURIComponent(this._sentences)
    };
    const endPoint = Utils.replaceStrAll(config.googleWebService, mapObj);
    return new Promise((resolve, reject) => {
      request(endPoint, (err, res, body) => {
        if (err) {
          reject(true);
        }

        if (res && res.statusCode === 200) {
          resolve(JSON.parse(body)[0][0][0]);
        } else {
          reject(true);
        }
      });
    });
  }
}
