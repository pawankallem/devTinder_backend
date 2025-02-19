const express = require("express");

const app = express();
const PORT = 5005;

app.get("/user",(req,res) => res.send("getting user information!"));
app.post("/user",(req,res) => res.send("stored user info sucessfully!!!!!"))
app.delete("/user",(req,res) => res.send("user deleted usecessfully"))

app.use("/", (req, res) => {
  res.send("Welcome to Home page!"); 
});

app.listen(PORT, () => console.log(`Your application is listening on ${PORT} \n http://localhost:${PORT}`));
