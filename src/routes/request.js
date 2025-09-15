const express = require('express');
const requestRouter = express.Router();
const User=require("../models/user");
const { userAuth } = require("../middlewares/auth");
requestRouter.post("/connection",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("sending Connection Request");
    res.send(user.firstName+" sending connection");
})

module.exports = requestRouter;