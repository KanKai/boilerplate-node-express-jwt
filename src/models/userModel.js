import mongoose from "mongoose";
import validator from "validator";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import message from "../constants/message.constant";
import { CryptoGenerator } from "../helpers/cryptoGenerator";
import { TokenGenerator } from "../helpers/tokenGenerator";
import role from "../constants/role.constant";
import { Utils } from "../utils/utils";

/**
 * Defining user schema
 */
const model = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new UnauthorizedException(message.INVALID_EMAIL);
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  },
  salt: {
    type: String
  },
  profile: {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    fullName: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    imgPath: {
      type: String
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      },
      loginDate: {
        type: Date,
        default: Date.now()
      },
      browser: {
        type: String
      },
      platform: {
        type: String
      }
    }
  ],
  role: {
    type: Number,
    default: role.userRoles.user
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

model.pre("save", async function(next) {
  const user = this;
  user.fullName = `${user.firstName} ${user.lastName}`;
  if (!user.isModified("password")) return next();
  /**
   * เข้ารหัส password ก่อนทำการบันทึก model
   */
  const salt = Utils.randomBytes();
  console.log("salt -> ", salt);
  user.salt = salt;
  user.password = await new CryptoGenerator(user.password, salt).cryptoSync();
  next();
});

model.methods.generateAuthToken = async function(platform = "", browser = "") {
  /**
   * สร้าง auth token สำหรับ user
   */
  const user = this;
  const token = new TokenGenerator({
    _id: user._id,
    email: user.email,
    role: user.role
  }).generate();
  user.tokens = user.tokens.concat({ token, platform, browser });
  await user.save();
  return token;
};

model.methods.removeFieldSecret = function() {
  let data = this.toObject();
  delete data.password;
  delete data.salt;
  return data;
};

model.statics.findByCredentials = async (email, password) => {
  /**
   * ค้นหา user โดย email และ password
   */
  let user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedException(message.INVALID_LOGIN_CREDENTIAL);
  }

  const isPasswordMatch = await new CryptoGenerator(
    password,
    user.salt,
    user.password
  ).cryptoCompareSync();

  if (!isPasswordMatch) {
    throw new UnauthorizedException(message.INVALID_LOGIN_CREDENTIAL);
  }

  return user;
};

/**
 * Creating user collection
 */
const User = mongoose.model("User", model);

/**
 * Exporting module
 */
export default User;
