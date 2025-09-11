const adminAuth=(req,res,next)=>{
    console.log("Admin auth get Checked");
    const token="xyz";
    const isAdminAuth=token==="xyz";
    if(!isAdminAuth){
        res.status(401).send("Unauthorized Request");
    }
    else{
        next();
    }
};
module.exports={adminAuth};
