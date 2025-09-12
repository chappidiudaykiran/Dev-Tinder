const express = require("express");
const app = express();
const connectDB=require("./config/database");
const User=require("./models/user");


app.post("/signup",async(req,res)=>{
    const user=new User({
        firstName:"uday",
        lastName:"kiran",
        email:"uday@example.com",
        password:"password123",
    });
    await user.save();
    res.send("user added successfully");
});


connectDB()
.then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });
})
.catch((err) => {
    console.error("database connection error", err);
});