const express = require("express");
const app = express();
const connectDB=require("./config/database");
const User=require("./models/user");

app.use(express.json());
app.post("/signup",async(req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.send("user added succesfull");
    }
    catch(error){
        res.status(400).send("error in user adding"+error.message);
    }
});
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});      
        res.send(users);
        console.log(users);
    }
    catch(error){ 
        res.send("error");
    }
});
app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const users=await User.find({email:userEmail});      
        res.send(users);
    }
    catch(error){
        res.send("error");
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
        res.send("error");
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