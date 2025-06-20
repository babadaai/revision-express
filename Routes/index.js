const express=require(`express`);
const router=express.Router();

const studentRouter=require("./student")
const userRouter=require("./users")
router.post("/register",(req,res)=>{
        res.json({msg:"user register"})
       
})
router.post("/login",(req,res,next)=>{
        try{
        const {username ,password} =req.body
        console.log({username,password})
      if(username!=="nischalmainali75@gmail.com"|| password!=="123"){
        throw new err("Invalid Credential")
      }else
        
       { res.json({msg:"Login-user"})}
        }
        catch(error){
              next({err})

        }
       
       
});
module.exports=router;