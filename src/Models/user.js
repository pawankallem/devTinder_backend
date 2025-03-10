const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      // maxLength: 5,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(inputEmail) {
        if (!validator.isEmail(inputEmail)) {
          throw new Error("Please enter valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      validate(inputPassword) {
        if (!validator.isStrongPassword(inputPassword)) {
          throw new Error("Your password must be strong!!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    photoUrl: {
      type: String,
      validate(inputPhotoUrl) {
        if (!inputPhotoUrl) {
          throw new Error("Please enter Profile URL");
        }
      },
      default: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
    },
    bio: {
      type: String,
      default: "This is default Bio of User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwt = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

userSchema.methods.compareAuthPasswords = async function (inputPasswordByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    inputPasswordByUser,
    passwordHash
  );
  return isPasswordValid;
};

// always start with Capital letter while defining Model
const User = mongoose.model("User", userSchema);

module.exports = User;
