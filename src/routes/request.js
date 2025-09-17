const express = require('express');
const requestRouter = express.Router();
const User=require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const UserModel = require('../models/user');
const mongoose = require('mongoose');

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status value="+status);
        }
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).send("User not found with id="+toUserId);
        }
        if (!toUserId || !mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).send("Invalid user id=" + toUserId);
        }
        //if there is any existing id
        const existingRequest=await ConnectionRequest.findOne({
           $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}], 
        });
        if(existingRequest){
            return res.status(400).send("Request already sent to this user");
        }
        const connectionRequest=new ConnectionRequest({fromUserId,toUserId,status});
        const data=await connectionRequest.save();
        res.json({message:req.user.firstName+" is "+status+" in "+toUser.firstName,data});
    }catch(error){
        res.status(400).send("Error : "+error.message);
    }
})

module.exports = requestRouter;