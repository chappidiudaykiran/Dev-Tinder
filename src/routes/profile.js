const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User=require("../models/user");
const {validateEditProfileData}=require("../utils/validation");
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }catch(error){
        res.status(400).send("Error : "+error.message);
    }
});
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit profile data");
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key])); 
        loggedInUser.save();
        res.json({ message: `${loggedInUser.firstName} Profile updated successfully`, data: loggedInUser });
    }catch(error){

        res.status(400).send("Error : "+error.message);
    }
});


module.exports = profileRouter;


// Forgot password API (no hashing)
// Forgot password API (with hashing)
profileRouter.patch("/profile/password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ error: "Email and newPassword are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({ message: "Password updated successfully (hashed)" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
 
