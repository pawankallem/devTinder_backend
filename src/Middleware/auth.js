const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const adminAuth = (req, res, next) => {
  const token = "xyzbb";
  //   alway try to use if and else conditions in middlewares, otherwise you will get errors
  if (token !== "xyz") {
    res.status(401).send("Unauthorized Admin token");
  } else {
    next();
  }
  // next();
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodedData = await jwt.verify(token, "pavan");
    if (!decodedData) throw new Error("Invalid Token");

    const user = await User.findById(decodedData._id);
    if (!user) throw new Error("Invalid Token Please login again");

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
