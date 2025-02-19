const express = require("express");

const app = express();
const PORT = 5005;


app.use("/test", (req, res) => res.send("Tesing the server"));

app.use("/hello", (req, res) => res.send("Hello world of Nodejs"));

app.use("", (req, res) => {
  res.send("Welcome to Home page!"); 
});

app.listen(PORT, () => console.log(`Your application is listening on ${PORT} \n http://localhost:${PORT}`));
