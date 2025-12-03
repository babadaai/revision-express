const router = require('express').Router();

const multer=require("multer")
// Login
const {generateToken}=require("../../utils/jwt")
const userController=require('./user.controller')


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
