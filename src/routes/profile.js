const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User=require("../models/user");
profileRouter.get("/profile",userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user);
});


module.exports = profileRouter;
 
