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

router.get("/feed", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const page = req.query.page || 1;
    let limit = req.query.limit || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((obj) => {
      hideUsersFromFeed.add(obj.fromUserId);
      hideUsersFromFeed.add(obj.toUserId);
    });

    const userFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: user._id } },
      ],
    })
      .select("firstName lastName")
      .skip(skip)
      .limit(limit);

    res.json({ data: userFeed });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
