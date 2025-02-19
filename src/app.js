const express = require("express");
const { adminAuth, userAuth } = require("./Middleware/auth");

const app = express();
const PORT = 5005;

app.use("/admin", adminAuth);

app.get("/admin", (req, res) => res.send("admin get request authenticated"));
app.post("/admin", (req, res) =>
  res.send("admin post request authenticated sucessfully")
);

app.get("/user", userAuth, (req, res) =>
  res.send("User authentication completed for get method")
);
app.post("/user", (req, res) =>
  res.send("without authentication user post requrest")
);

app.listen(PORT, () =>
  console.log(
    `Your application is listening on ${PORT} \n http://localhost:${PORT}`
  )
);
