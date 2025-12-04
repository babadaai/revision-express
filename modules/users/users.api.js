const router = require('express').Router();

const multer=require("multer")
// Login
const {generateToken}=require("../../utils/jwt")
const userController=require('./user.controller')
const userSchema=require('./user.model')
const {secure}=require("../../utils/new_secure")


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
router.post('/generate-email-token', async(req, res, next) => {
    try{
       
      const result = await userController.generateEmailtoken(req.body)
        res.json({msg:"tokenGenerated",data:result})
      
} 
catch(e){
    next(e);
}
})

router.post('/verify-email', async(req, res, next) => {
    try{
       
      const result = await userController.verifyEmailToken(req.body)
        res.json({
            msg: "Email verified successfully",
            data: result,
            isEmailVerified:userController.updateEmailVerfication
        });
      
} 
catch(e){
    next(e);
}
})


router.post('/login', async(req, res, next) => {
    try{
        const {email, password}=req.body
        const result = await userController.login({email,password})
      
        res.json({msg:"User logged in",data:result})
      
} 

catch(e)
{    next(e)
        }
}

);
//register 

router.post("/register",  upload.single('profile'),validator,async (req,res,next)=>{
    try{
            const {email}=req.body;
            if (req.file){
                        req.body.profile=req.file.path
                 
            }
            const result= await userController.create(req.body)
           // console.log(req.body,req.files,req.file)
           
              
                res.json({msg:"Movie registration successful",data:result})
    }
    catch(e){
        next(e);
    }
})

// List Users
router.get('/', secure(["admin"]),(req, res, next) => {
    try{
    res.json({ msg: 'All users listed', data:[] });
    }
    catch(e){
        next(e);
    }
});
router.patch('/:id',async(req,res,next)=>{
})


module.exports = router;
