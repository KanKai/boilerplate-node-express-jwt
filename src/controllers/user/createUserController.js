import UserModel from "../../models/user.model";

export class CreateUserController {
  /**
   * CreateUserController constructor
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
      user = await user.removePasswordField();
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}
