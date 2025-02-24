const express = require("express");
const connectDB = require("./config/database");
const User = require("./Models/user");
const { adminAuth, userAuth } = require("./Middleware/auth");

const app = express();
const PORT = 5005;

// Middleware to READ the JSON data.
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("request body : ", req.body);

  try {
  const { firstName, lastName, email, password, age, photoUrl } = req.body;

  if(!firstName || !email || !password || !photoUrl ) {
    throw new Error("Please enter details in all required fields ")
  }
  if(password.length < 4) {
    throw new Error("Your password must be more then 3 letters")
  }

  // Below line creating a INSTANCE of user model from the schema
  const user = new User(req.body);
    await user.save();
    res.send("User Created Sucessfully  :-)   ");
  } catch (error) {
    res.status(400).send("User not created!! something went wrong : " + error.message);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.email;
  // const user = await User.findById("67b5ebc4cb03b6b8d4678cd9").exec();
  try {
    const user = await User.findOne({ email: email });
    // const user = await User.find({ email: email });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  // const email = req.body.email;
  const userId = req.body.userId;
  try {
    // const deletedUser = await User.findOneAndDelete({email:email});
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.send("user deleted sucessfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const userData = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
    });
    if (userData) {
      res.send({ Message: "Updated Sucessfully!", userData: userData });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(404).send("Users not found");
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
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
