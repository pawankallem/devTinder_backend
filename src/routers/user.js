const express = require("express");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth");
const ConnectionRequest = require("../Models/connectionRequest");

const router = express.Router();

const safeData = ["firstName", "lastName"];

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", safeData);

    res.json({
      message: "Connection request data fetched sucessfully !",
      data,
    });
  } catch (error) {
    res.send(400).json({ message: "Error : " + error.message });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: user._id, status: "accepted" },
        { toUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", safeData)
      .populate("toUserId", safeData);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === user._id.toString())
        return row.toUserId;
      return row.fromUserId;
    });

    res.json({ message: "Your connections!", data });
  } catch (error) {
    res.status(400).json({ message: "Error : " + error.message });
  }
});

module.exports = router;
