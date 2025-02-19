const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// always start with Capital letter while defining Model
const User = mongoose.model("User", userSchema);

module.exports = User;
