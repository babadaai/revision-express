const express=require(`express`);
const router=express.Router();

const studentRouter=require("./student")
const userRouter=require("./users")
router.post('/:id',(req,res)=>{
   console.log( {query:req.query,
                Param:req.params,
                Body:req.body}
   )
    res.json({msg:" post world"})
})

router.get('/',(req,res)=>{
   
    res.json({msg:"Hello world"})
})

router.put('/:id',(req,res)=>{
     console.log({query:req.query, param:req.params, body:req.body})
    res.json({msg:"put world"})
})


router.patch('/:id',(req,res)=>{
      console.log({query:req.query, param:req.params, body:req.body})
    res.json({msg:"patch world"})
})

router.delete('/:id',(req,res)=>{
      console.log({query:req.query, param:req.params, body:req.body})
    res.json({msg:"Delete world"})
})
app.use("/student",studentRouter)
app.use("/users", userRouter)
module.exports=router;