const express = require('express');
const authRouter = express.Router();
const User=require("../models/user");
const { userAuth } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');   
const {valiadatesignup}=require("../utils/validation");
authRouter.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try {
        valiadatesignup(req);
        await user.save();
        // Generate JWT and set cookie
        const token = await user.getJWT();
        res.cookie("token", token);
        res.send("user added succesfull");
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

authRouter.post("/login",async(req,res)=>{
    try {
        let { email, password } = req.body;
        console.log("Login email received:", email);
        email = email.trim().toLowerCase();
        const user = await User.findOne({ email });
        console.log("User found:", user);
        if (!user) {
            return res.status(400).send("Invalid credentials: user not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials: wrong password");
        }
        const token = await user.getJWT();
        res.cookie("token", token);
        res.send("Login successful");
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

authRouter.post("/logout",userAuth,async(req,res)=>{
    res.clearCookie("token");
    res.send("Logout successful");
});

authRouter.post("/updatePassword", userAuth, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send("Password updated successfully");
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

module.exports = authRouter;
