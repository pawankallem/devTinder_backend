const express = require("express");
const { userAuth } = require("../Middleware/auth");
const {
  validateProfileEditData,
  validateForgotPasswordField,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    res.send(loggedInUser);
  } catch (error) {
    res.status(400).send("Error : ", error);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) throw new Error("Invalid Edit fields");

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} details updated sucessfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).json({
      message: `update failed!`,
      error: error,
    });
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateForgotPasswordField(req))
      throw new Error("Please fill the Password fields");

    const { currentPassword, newPassword, confirmPassword } = req.body;
    const loggedInUser = req.user;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      loggedInUser.password
    );

    if (!isPasswordValid) throw new Error("Invalid credentials");

    if (newPassword !== confirmPassword)
      throw new Error("Please match your new password");

    loggedInUser.password = await bcrypt.hash(newPassword, 10);
    loggedInUser.save();

    res.json({
      message: "Your password update sucessfully ! ",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error : " + error);
  }
});

module.exports = router;
