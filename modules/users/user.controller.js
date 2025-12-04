const userModel = require("./user.model"); 
const event =require("events")

const {genHash, compHash}=require("../../utils/bycrypt")
const { sendMail } = require('../../services/mailer');
const { generateToken, generateOtp } = require("../../utils/jwt");
const userController=require('./user.controller')


const eventEmitter=new event.EventEmitter();
eventEmitter.addListener("signup", (email)=> sendMail({
                    email,
                    subject:"Movie-Mate sign up",
                    htmlMsg:"<b>Thank's for joining Movie-Mate</b>"
                }))
 eventEmitter.addListener("Email-verification", (email,otp)=> sendMail({
                    email,
                    subject:"Movie-Mate Email-verification",
                    htmlMsg:`Your otp for Email-verification is <b>${otp}</b>`
                }))


const create = async (payload) => {
    const {password}=payload
    payload.password=genHash(password)
    
    const result= await userModel.create(payload);
    return result;
};
const login = async (payload) => {
  const { email, password } = payload;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (!user.isEmailVerified) throw new Error("Email needs to be verified");

  const isValid = await compHash({
    payload: password,
    hashPayload: user.password
});

  if (!isValid) throw new Error("Invalid password");

  const tokenPayload = {
    name: user.name,
    roles: user.roles,
  };

  const token = generateToken(tokenPayload);
  if(!token) throw new Error("Something went wrong")
  return token;
};
const generateEmailtoken = async (payload) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const isVerified =user?.isEmailVerified;
    if(!isVerified){
      const otp = generateOtp();
      const updateUser = await userModel.updateOne({_id :user?.id},{otp})
      if(!updateUser) throw new Error ("Something went wrong")
        eventEmitter.emit("emailVerification",email,otp);
    console.log({otp});
}
      
    }

const getById = async (id) => {
    return await userModel.findById(id).select('-password'); 
};

const list = async () => {
    return await userModel.find({}).select('-password');
};

const updateById = async (id, payload) => {
    return await userModel.findByIdAndUpdate(
        id, 
        payload, 
        { new: true, runValidators: true }
    );
};

const removeById = async (id) => {
    return await userModel.deleteOne({ _id: id });
};
const verifyEmailToken=async(payload)=>{
                   const { email,token } = payload;
                    if (!email ) throw new Error("Email is required");
                  const user = await userModel.findOne({ email });
             if (!user) throw new Error("User not found");
             const isTokenValid=String(user?.otp)===String(token)
             if(!isTokenValid) throw new Error ("Token is mismatched")
          const result =await userModel.updateOne({_id:user?.id, isEmailVerified:true, otp:"",})
            if(!result) throw new Error("Something went wrong")
              return isTokenValid;
}
const updateEmailVerfication = async(id,payload)=>{
  return await userModel.findByIdAndUpdate(
    isEmailVerified=true
  )
}
module.exports = { create, getById, list, updateById, removeById, login,generateEmailtoken,verifyEmailToken, updateEmailVerfication};