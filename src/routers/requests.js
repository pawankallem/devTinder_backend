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
    // if (fromUserId.equal(toUserId))
    //   return res
    //     .status(400)
    //     .json({ message: "Self Connection Request not acceptable" });

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

module.exports = router;
