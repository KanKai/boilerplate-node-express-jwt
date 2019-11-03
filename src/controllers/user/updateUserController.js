import Transaction from "mongoose-transactions";

export class UpdateUserController {
  /**
   * UpdateUserController constructor
   *
   * @param {Object} user
   * @param {Object} reqBody
   */
  constructor(user, reqBody) {
    this._user = user;
    this._reqBody = reqBody;
    this.model = "User";
  }

  /**
   * Store data to db
   *
   * @returns {Promise<T>}
   */
  async store() {
    let transaction = new Transaction();
    try {
      const userDetail = await transaction.update(
        this.model,
        this._user._id,
        this._reqBody
      );
    } catch (error) {
      const rollbackObj = await transaction.rollback().catch(console.log);
      transaction.clean();
      throw error;
    }
  }
}
