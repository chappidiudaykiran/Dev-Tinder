const express = require("express");
const app = express();
const connectDB=require("./config/database");
const User=require("./models/user");
const {valiadatesignup}=require("./utils/validation");
const bcrypt = require('bcrypt');   

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
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});      
        res.send(users);
        console.log(users);
    }
    catch(error){ 
        res.status(400).send("Error : "+error.message);
    }
});
app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const users=await User.find({email:userEmail});      
        res.send(users);
    }
    catch(error){
        res.status(400).send("Error : "+error.message);
    }
});
app.delete("/deleteuser",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const users=await User.findByIdAndDelete(userId);      
        res.send("user deleted");
    }
    catch(error){ 
        res.send("error");
    }
});
app.patch("/updateuser",async(req,res)=>{
    const userId=req.body.userId;
    const updateData=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},updateData);      
        res.send("user updated");
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
        res.send("Login successful");
    }   
    catch(error){
        res.status(400).send("Error : "+error.message);
    }
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