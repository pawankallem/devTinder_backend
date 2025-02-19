const express = require("express");

const app = express();
const PORT = 5005;

app.use(
  "/user",
  (req, res, next) => {
    console.log("1st handler");
    next();
    res.send("1st request");
  },
  (req, res, next) => {
    console.log("2nd handle");
    next();
    // res.send("2nd request")
  },
  [
    (req, res, next) => {
      console.log("3rd handler");
      next();
    },
    (req, res, next) => {
      console.log("4th handler");
      // next()
    },
  ]
);

app.listen(PORT, () =>
  console.log(
    `Your application is listening on ${PORT} \n http://localhost:${PORT}`
  )
);
