const express = require("express");
const app = express();
const connectDB=require("./config/database");
const cookieParser = require('cookie-parser');

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");    


app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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