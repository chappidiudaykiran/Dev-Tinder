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