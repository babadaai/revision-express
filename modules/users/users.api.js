const router = require('express').Router();
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
