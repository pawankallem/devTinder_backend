const express = require("express");
const connectDB = require("./config/database");
const User = require("./Models/user");
const { adminAuth, userAuth } = require("./Middleware/auth");
const { validateSignupData } = require("./helpers/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5005;

// Middleware to READ the JSON data.
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password, photoUrl, age } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword : ", hashedPassword);
    // Below line creating a INSTANCE of user model from the schema
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      age: age,
      photoUrl: photoUrl,
    });
    await user.save();
    res.send("User Created Sucessfully  :-)   ");
  } catch (error) {
    res
      .status(400)
      .send("User not created!! something went wrong : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid credentials");

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.compareAuthPasswords(password);

    console.log("line 53")

    if (!isPasswordValid) throw new Error("Invalid credentials");
    else {
      const token = await user.getJwt();
      // const token = await jwt.sign({ _id: user._id }, "pavan", {expiresIn: '0h'});

      console.log("jwt : ", token);

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("User Logged in sucessfully");
    }
  } catch (error) {
    res.status(400).send("something went wrong : " + error.message);
  }
});

app.get("/user", userAuth, async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(404).send("something went wrong " + error.message);
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
