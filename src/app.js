const express = require("express");
const connectDB = require("./config/database");
const User = require("./Models/user");
const { adminAuth, userAuth } = require("./Middleware/auth");

const app = express();
const PORT = 5005;

app.post("/signup", async (req, res) => {
  const newUser = {
    firstName: "b",
    lastName: "c",
    email: "c@abc.com",
    password: "abcd",
  };

  // Below line creating a INSTANCE of user model from the schema
  const user = new User(newUser);
  try {
    await user.save();
    res.send("User Created Sucessfully  :-)   ")
  } catch (error) {
    res.status(400).send("User not created!! something feels offf");
  }
});

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
