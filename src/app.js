const express = require("express");
const { adminAuth, userAuth } = require("./Middleware/auth");

const app = express();
const PORT = 5005;

app.use("/admin", adminAuth);

app.get("/admin", (req, res) => res.send("admin get request authenticated"));
app.post("/admin", (req, res) =>
  res.send("admin post request authenticated sucessfully")
);

app.get("/user", userAuth, (req, res) => {
  try {
    // throw new error("error here");
    res.send("User authentication completed for get method");
  } catch (error) {
    res.status(500).send("single route error handling");
  }
});
app.post("/user", (req, res) => {
  // throw new error("global error handling");
  res.send("without authentication user post requrest");
});

// Wild card error handling
app.use("/", (err, req, res, next) => {
  res.status(500).send("Global: Something went wrong");
});

app.listen(PORT, () =>
  console.log(
    `Your application is listening on ${PORT} \n http://localhost:${PORT}`
  )
);
