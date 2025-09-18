const express=require('express');
const userRouter=express.Router();

const User=require("../models/user");
const ConnectionRequest=require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");

//get the all pending connection request for logged in user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate('fromUserId', 'firstName lastName email'); // Populate fromUserId with user details
        res.json({
            message:"Connection requests fetched successfully",
            data:connectionRequests
        });
    }catch(error){
        res.status(400).send("Error : "+error.message);
    }
});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try
    {
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ],
            status:"accepted"
        }).populate('fromUserId toUserId', 'firstName lastName email'); // Populate both fromUserId and toUserId with user details
        const data=connections.map((row)=>row.fromUserId);
        res.json({
            message:"Connections fetched successfully",
            data
        });
    }catch(error){
        res.status(400).send("Error : "+error.message);
    }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
            //should see all the connection requests except
            // 0.connection of his own
            // 1.connection of he ignored
            // 2.connection of already he sent request
            // 3. his connections
            const loggedInUser=req.user;
            const connectionRequests=await ConnectionRequest.find({
                $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
            }).select("fromUserId toUserId");
            const hideUsersFromFeed=new Set();
            connectionRequests.forEach(req=>{
                hideUsersFromFeed.add(req.fromUserId.toString());
                hideUsersFromFeed.add(req.toUserId.toString());
            });
            const users=await User.find({
               $and:[ {_id:{$nin:Array.from(hideUsersFromFeed)}}, { _id: { $ne: loggedInUser._id } } ]
            }).select('firstName lastName email');
            res.send(users);
    }catch(error){
        res.status(400).send("Error : "+error.message);
    }
});

module.exports=userRouter;