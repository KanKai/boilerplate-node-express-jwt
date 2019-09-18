import UserModel from "../../models/user.model";
import { UnauthorizedException } from "./../../exceptions/unauthorizedException";
import message from "../../constants/message.constant";

export class LogoutController {
  /**
   * LogoutController constructor
   * @param {Object} reqUser
   */
  constructor(reqUser) {
    this._reqUser = reqUser;
  }

  /**
   * Logout user
   *
   * @returns {Promise}
   */
  async logout() {
    try {
      this._reqUser.user.tokens = this._reqUser.user.tokens.filter(token => {
        return token.token !== this._reqUser.token;
      });
      return await this._reqUser.user.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user all device
   *
   * @returns {Promise}
   */
  async logoutAll() {
    try {
      this._reqUser.user.tokens.splice(0, this._reqUser.user.tokens.length);
      return await this._reqUser.user.save();
    } catch (error) {
      throw error;
    }
  }
}
