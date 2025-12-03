require("dotenv").config();
const jwt = require("jsonwebtoken");
const Crypto=require("crypto");

const generateToken=(payload)=>jwt.sign({
  data: payload
}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION});

const verifyToken=(token)=>jwt.verify(token,process.env.JWT_SECRET)

const checkRole=({sysRole,userRole})=>
    userRole.some(role=>sysRole.includes(role))

const generateOtp=()=>{
  return Crypto.randomInt(100000,999999)
}

console.log(generateOtp())

module.exports={checkRole,generateToken,verifyToken,generateOtp}