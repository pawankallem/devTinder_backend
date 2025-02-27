const express = require("express");
const ConnectionRequest = require("../Models/connectionRequest");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth");
const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const status = req.params.status;
    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;

    const AcceptableStatus = ["interested", "ignored"];
    if (!AcceptableStatus.includes(status))
      return res
        .status(400)
        .json({ message: `Invalid status type : ${status}` });

    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ message: "Invalid User" });

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest)
      return res.status(400).json({
        message: `Connection request for ${req.user.firstName} and ${toUser.firstName} already existed`,
      });

    const newConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const result = await newConnectionRequest.save();

    res.json({
      message: `${req.user.firstName} to ${toUser.firstName} connection request : ${status}`,
    });
  } catch (error) {
    res.status(400).json({ message: `Error : ${error.message}` });
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const user = req.user;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        return res
          .status(400)
          .json({ message: `Invalid Status type : ${status}` });

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: user._id,
        status: "interested",
      });

      if (!connectionRequest)
        return res.status(404).json({ message: "Invalid Request" });

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: `Connection Request ${status}`, data });
    } catch (error) {
      res.status(400).json({ message: `Error : ${error}` });
    }
  }
);

module.exports = router;
