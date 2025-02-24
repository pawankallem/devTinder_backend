const mongoose = require("mongoose");

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
      // match: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
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
      required: true,
      validate(inputPhotoUrl) {
        console.log("input url : ", inputPhotoUrl)
        if(!inputPhotoUrl) {
          throw new Error("Please enter Profile URL")
        }
      }
    }
  },
  {
    timestamps: true,
  }
);

// always start with Capital letter while defining Model
const User = mongoose.model("User", userSchema);

module.exports = User;
