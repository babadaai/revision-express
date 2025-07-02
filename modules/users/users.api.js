const router = require('express').Router();
const event =require("events")
const { sendMail } = require('../../services/mailer');
// Login
const {generateToken}=require("../../utils/jwt")

router.post('/login', (req, res, next) => {
    try{
        const {email, password}=req.body
  if (email==="nischal@123.com" && password==="123"){
    const payload={
        email,
        role:["admin"]
    }

      const token=generateToken(payload);
   return res.json({ msg: 'User logged in',data:token });
}else
        {   
             res.json({msg:"Invalid login",data:""})
            
        }       
} 
catch(e)
{    next(e)
        }
}

);
//register 
const eventEmitter=new event.EventEmitter();
eventEmitter.addListener("signup", (email)=> sendMail({
                    email,
                    subject:"Movie-Mate sign up",
                    htmlMsg:"<b>Thank's for joining Movie-Mate</b>"
                }))
router.post("/register",async(req,res,next)=>{
    try{
            const {email}=req.body;
            if(!email) throw new Error("Email is missing ")
               eventEmitter.emit("signup",email)
                res.json({msg:"Movie registration successful"})
    }
    catch(e){
        next(e);
    }
})

// List Users
const {secure}=require("../../utils/new_secure")
router.get('/', secure(["admin"]),(req, res, next) => {
    try{
    res.json({ msg: 'All users listed', data:[] });
    }
    catch(e){
        next(e);
    }
});


module.exports = router;
