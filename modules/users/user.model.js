// modules/users/user.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String, 
      required: true,
      unique: true, // Prevents duplicate emails
    },
    password: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: Number, // Corrected from 'number'
    },
    role: { 
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true, 
    },
    isEmailVerified: { 
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Corrected from 'timestamp'
  }
);

module.exports = model("User", userSchema);