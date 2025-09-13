const validator = require('validator');
const valiadatesignup=(req)=>{
    const {firstname,lastname,email,password}=req.body;

    if(!email || !validator.isEmail(email)){
        throw new Error("Valid email is required");
    }
}
module.exports={valiadatesignup};