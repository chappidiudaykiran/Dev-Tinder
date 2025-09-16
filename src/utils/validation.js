const validator = require('validator');
const valiadatesignup=(req)=>{
    const {firstName, lastName, email, password} = req.body;

    if(!email || !validator.isEmail(email)){
        throw new Error("Valid email is required");
    }
    // Optionally add more validation for firstName, lastName, password
}
const validateEditProfileData=(req)=>{
    const allowedEditFields = ["firstName", "lastName", "email", "gender", "age"];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );
    return isEditAllowed;
}
module.exports={valiadatesignup,validateEditProfileData};