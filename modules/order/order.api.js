const router = require("express").Router();
 
router.post("/",(req,res,next)=>{
    try{
        res.json({msg:"Created an order"})
    }catch(e){
        next(e);
    }
})
router.get("/",(req,res,next)=>{
    try{
        res.json({msg:"Listed all order"})
    }catch(e){
        next(e);
    }
})
router.get("/:id",(req,res,next)=>{
    try{
        const {id}=req.params
        res.json({msg:`Get an order of ${id}`})
    }catch(e){
        next(e);
    }
})
router.delete("/:id",(req,res,next)=>{
    try{
          const {id}=req.params
        res.json({msg:`delete an order ${id}`})
    }catch(e){
        next(e);
    }
})
router.patch("/:id/status",(req,res,next)=>{
    try{
        const {id}=req.params
        res.json({msg: `Status updated for id ${id}`})
    }catch(e){
        next(e);
    }
})

router.put("/:id/status",(req,res,next)=>{
    try{
          const {id}=req.params
        res.json({msg: `Status updated for id ${id}`})
    }catch(e){
        next(e);
    }
})




module.exports=router;