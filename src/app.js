const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/requests");
const userRouter = require("./routers/user");

const app = express();
const PORT = process.env.PORT || 5005;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
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
