const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name cannot exceed 50 characters"]
  },

  lastName: {
    type: String,
    trim: true,
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Please enter a valid email address"
    }
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    validate: {
      validator: function (v){
        validator.isStrongPassword(v, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        });
      }
    }
  },

  age: {
    type: Number,
    min: [13, "Age must be at least 13"],
    max: [120, "Age must be less than 120"]
  },

  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "{VALUE} is not a valid gender"
    }
  }
},{
    timestamps:true
});

userSchema.methods.getJWT =async function() {
  const user = this;
  const token=await jwt.sign({id:user._id},'Uday@123$',{expiresIn:'7d'});

  return token;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
