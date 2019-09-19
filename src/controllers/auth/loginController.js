import UserModel from "../../models/userModel";
import { UnauthorizedException } from "./../../exceptions/unauthorizedException";
import message from "../../constants/message.constant";

export class LoginController {
  /**
   * LoginController constructor
   * @param {String} email
   * @param {String} password
   */
  constructor(email, password) {
    this._email = email;
    this._password = password;
  }

  /**
   * Login
   *
   * @returns {Promise}
   */
  async login() {
    try {
      const user = await UserModel.findByCredentials(
        this._email,
        this._password
      );

      if (!user) {
        throw new UnauthorizedException(message.INVALID_USER_OR_PASSWORD);
      }

      const token = await user.generateAuthToken();
      const result = user.removePasswordField();
      return { result, token };
    } catch (error) {
      throw error;
    }
  }
}
