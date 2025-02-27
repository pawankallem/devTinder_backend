const express = require("express");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth");
const connectionRequest = require("../Models/connectionRequest");

const router = express.Router();

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = await connectionRequest
      .find({
        toUserId: user._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName"]);

    res.json({
      message: "Connection request data fetched sucessfully !",
      data,
    });
  } catch (error) {
    res.send(400).json({ message: "Error : " + error.message });
  }
});

module.exports = router;
