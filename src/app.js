const express = require("express");
const app = express();
const connectDB=require("./config/database");
const User=require("./models/user");
const {valiadatesignup}=require("./utils/validation");
const bcrypt = require('bcrypt');   
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth");

app.use(cookieParser());
app.use(express.json());

app.post("/signup",async(req,res)=>{
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

app.post("/login",async(req,res)=>{
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
        const token=jwt.sign({id:user._id},'Uday@123$',{expiresIn:'7d'});
        res.cookie("token",token);
        res.send("Login successful");
        
    }   
    catch(error){
        res.status(400).send("Error : "+error.message);
    }
});

app.get("/profile",userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user);
});
app.post("/connection",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("sending Connection Request");
    res.send(user.firstName+" sending connection");
})


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