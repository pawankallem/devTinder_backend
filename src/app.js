const express = require("express");

const app = express();
const PORT = 5005;

// app.get("/user/:userId/:password",(req,res) => {
app.get("/user",(req,res) => {
  // console.log("req query : ", req.query)
  // console.log("static params : ", req.params)
  res.send("getting user information!")
});
app.post("/user",(req,res) => res.send("stored user info sucessfully!!!!!"))
app.delete("/user",(req,res) => res.send("user deleted usecessfully"))

app.use("/", (req, res) => {
  res.send("Welcome to Home page!"); 
});

app.listen(PORT, () => console.log(`Your application is listening on ${PORT} \n http://localhost:${PORT}`));
