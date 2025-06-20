const express=require(`express`);
const router=express.Router();

const studentRouter=require("./student")
const userRouter=require("./users")
router.post("/register",(req,res)=>{
        res.json({msg:"user register"})
       
})
router.post("/login",(req,res)=>{
        res.json({msg:"Login-user"})
       
});
module.exports=router;