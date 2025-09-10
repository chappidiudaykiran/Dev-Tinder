const express = require("express");
const app = express();
app.use("/user", (req, res, next) => {
  console.log("Error handle 1");
  next();
},
(req, res, next) => {
  console.log("Error handle 2");
  next();
},
(req, res, next) => {
  console.log("Error handle 3");
  res.send("Hello from the other side");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
