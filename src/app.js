const express = require("express");
const app = express();
const {adminAuth}=require("./middlewares/auth");
app.use("/admin",adminAuth);
app.use("/admin/hi", (req, res) => {
  console.log("checking middle ware");
  res.send("hello from admin");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
