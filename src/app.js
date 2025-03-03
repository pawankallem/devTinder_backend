const express = require("express");
const connectDB = require("./config/database");
const User = require("./Models/user");
const { adminAuth, userAuth } = require("./Middleware/auth");
const { validateSignupData } = require("./helpers/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/requests");
const userRouter = require("./routers/user");

const app = express();
const PORT = 5005;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
  // cors()
);
// Middleware to READ the JSON data.
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Wild card error handling
app.use("/", (err, req, res, next) => {
  res.status(500).send("Global: Something went wrong");
});

connectDB()
  .then(() => {
    console.log("Mongodb connection established sucessfully !!");
    app.listen(PORT, () =>
      console.log(
        `Your application is listening on ${PORT} \n http://localhost:${PORT}`
      )
    );
  })
  .catch((error) => console.log("error while connecting to database"));
