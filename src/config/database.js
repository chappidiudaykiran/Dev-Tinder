const mongoose = require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://udaykiran24689_db_user:gtladiQ7vpcrs2Nm@cluster0.kx0ctd7.mongodb.net/devtinder"
    );
};
module.exports=connectDB;



