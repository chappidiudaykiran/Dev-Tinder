const express = require('express');
const authRouter = express.Router();
const User=require("../models/user");
const { userAuth } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');   
const {valiadatesignup}=require("../utils/validation");
authRouter.post("/signup",async(req,res)=>{
    const user=new User(req.body);
    try{
        valiadatesignup(req);
        const {password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        console.log(hashedPassword);
        user.password=hashedPassword;
        await user.save();
        res.send("user added succesfull");
    }
    catch(error){
        res.status(400).send("Error : "+error.message);
    }
});

authRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).send("Invalid creadentials");
        }
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            return res.status(400).send("Invalid credentials");
        }
        const token=await user.getJWT();
        res.cookie("token",token);
        res.send("Login successful");
        
    }   
    catch(error){
        res.status(400).send("Error : "+error.message);
    }
});



module.exports = authRouter;
