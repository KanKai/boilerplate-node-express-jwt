"use strict";

import { GoogleTranslateService } from "./../../services/googleTranslateService";

export class GetTranslateController {
  /**
   *
   * @param {String} keyword
   * @param {String} from_lang th
   * @param {String} to_lang en
   */
  async get(keyword, from_lang, to_lang) {
    try {
      const result = await new GoogleTranslateService(
        keyword,
        from_lang,
        to_lang
      ).translate();
      return { result: result.replace(/<br>/g, "\n") };
    } catch (error) {
      throw error;
    }
  }
}
