const adminAuth = (req, res, next) => {
  const token = "xyz";
  //   alway try to use if and else conditions in middlewares, otherwise you will get errors
  if (token !== "xyz") {
    res.status(401).send("Unauthorized Admin token");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyzzz";
  if (token !== "xyz") {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
  //   next();
};

module.exports = {
  adminAuth,
  userAuth,
};
