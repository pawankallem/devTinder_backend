const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

const router = express.Router();
const { validateSignupData } = require("../helpers/validation");

router.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password, photoUrl, age, bio } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // Below line creating a INSTANCE of user model from the schema
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      age: age,
      photoUrl: photoUrl,
      bio: bio,
    });
    const savedUser = await user.save();

    const token = await user.getJwt();
    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

    res.json({ message: "User Created Sucessfully :-) ", data: savedUser });
  } catch (error) {
    res
      .status(400)
      .send("User not created!! something went wrong : " + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await user.compareAuthPasswords(password);

    if (!isPasswordValid) throw new Error("Invalid credentials");
    else {
      const token = await user.getJwt();

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.json({ message: "User Loggedin Sucessfully", data: user });
    }
  } catch (error) {
    res.status(400).send("something went wrong : " + error.message);
  }
});

router.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Logout Sucessfull");
});

module.exports = router;
