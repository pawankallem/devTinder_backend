const express = require("express");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth")

const router = express.Router();

router.get("/user", userAuth, async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(404).send("something went wrong " + error.message);
  }
});

router.delete("/user", async (req, res) => {
  // const email = req.body.email;
  const userId = req.body.userId;
  try {
    // const deletedUser = await User.findOneAndDelete({email:email});
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.send("user deleted sucessfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

router.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const userData = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
    });
    if (userData) {
      res.send({ Message: "Updated Sucessfully!", userData: userData });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

router.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(404).send("Users not found");
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

module.exports = router
