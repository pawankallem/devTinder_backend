const mongoose = require("mongoose");

const connectDB = async () =>
  await mongoose.connect(
    "mongodb+srv://kallempavan1997:4X6mjkRaWHlQAQlq@namastenodelearning.fyjqx.mongodb.net/devTinder"
  );

module.exports = connectDB;
