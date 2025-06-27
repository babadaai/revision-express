require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken=(payload)=>jwt.sign({
  data: payload
}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION});

const verifyToken=(token)=>jwt.verify(token,process.env.JWT_SECRET)

const checkRole=({sysRole,userRole})=>
    userRole.some(role=>sysRole.includes(role))



module.exports={checkRole,generateToken,verifyToken}