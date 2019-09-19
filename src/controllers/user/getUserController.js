import UserModel from "../../models/userModel";
import { NotFoundException } from "../../exceptions/notFoundException";
import message from "../../constants/message.constant";

export class GetUserController {
  /**
   * Get all users
   *
   * @returns {Promise}
   */
  async all() {
    try {
      return await UserModel.find().lean();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user detail by user ID
   *
   * @param {String} userId
   * @returns {Promise}
   */
  async detail(userId) {
    try {
      let userResult = await UserModel.findById(userId)
        .select("-password")
        .lean();
      if (userResult !== null) {
        return userResult;
      } else {
        throw new NotFoundException(message.CANNOT_FIND_DATA);
      }
    } catch (error) {
      throw error;
    }
  }
}
