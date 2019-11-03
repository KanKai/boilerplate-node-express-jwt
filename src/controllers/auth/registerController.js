import UserModel from "../../models/userModel";

export class RegisterController {
  /**
   * RegisterController constructor
   * @param {*} data
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * Store data DB
   * @returns {Promise<T>}
   */
  async store() {
    try {
      let user = new UserModel(this._data);
      await user.save();
      const token = await user.generateAuthToken();
      user = await user.removeFieldSecret();
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}
