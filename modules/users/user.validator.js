const express = require("express");
const Joi=require("joi")


const userSchema = Joi.object({
    name:Joi.string(),
  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com','np'] } })
        .required(),

  password:Joi.string().required(),
  phoneNum:Joi.number(),
  role:Joi.array().items(Joi.string().valid("admin","user"), Joi.number()),
  image:Joi.string(),
  isEmailVerifed:Joi.boolean(),
    isActive:Joi.boolean(),


});
const validator=async(req,res,next)=>{
    
        const { error, value } = await userSchema.validateAsync( req.body );
      next();
  if (error) {
    return res.status(400).json({ msg: "error"});
  }else{
  next();}
}
        
   


module.exports={validator}