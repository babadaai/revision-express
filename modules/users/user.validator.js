const e = require("express");
const Joi=require("joi")


const userSchema = Joi.object({
    name:Joi.string(),
  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com','np'] } })
        .required(),

  gender:Joi.string().valid("Male","Female","Others"),
  profile:Joi.string(),

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