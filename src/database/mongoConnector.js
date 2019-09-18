import mongoose from "mongoose";

// set mongoose promise
mongoose.Promise = Promise;

export class MongoConnector {
  /**
   * MongoConnector constructor
   *
   * @param {String} host
   * @param {String} user
   * @param {String} pass
   */
  constructor(host, user, pass) {
    this._host = host;
    this._user = user;
    this._pass = pass;
  }

  /**
   * Connect DB
   *
   * @returns {Promise}
   */
  async connect() {
    return await mongoose.connect(this._host, {
      user: encodeURI(this._user),
      pass: encodeURI(this._pass),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }
}
