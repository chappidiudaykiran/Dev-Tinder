const mongoose = require('mongoose');
const validator = require('validator');

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
      validator: function (v) {
        // At least 1 letter and 1 number
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v);
      },
      message: "Password must contain at least one letter and one number"
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

const User = mongoose.model('User', userSchema);
module.exports = User;
