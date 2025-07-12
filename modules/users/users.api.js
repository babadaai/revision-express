const router = require('express').Router();
const event =require("events")
const multer=require("multer")
const { sendMail } = require('../../services/mailer');
// Login
const {generateToken}=require("../../utils/jwt")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
        
    },
    filename: function (req, file, cb) {
        console.log({file},Date.now())
      
        cb(null, file.fieldname.concat("-",Date.now(),".", file.originalname.split[1]))
    }
})
const upload=multer({storage: storage, limits: { fileSize: 1 * 1024 * 1024 } })

const {validator}=require("./user.validator")


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
router.post("/register",  upload.single('profile'),validator,(req,res,next)=>{
    try{
            const {email}=req.body;
           // console.log(req.body,req.files,req.file)
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
