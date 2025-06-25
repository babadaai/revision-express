const router = require('express').Router();

const {mw}=require("../../utils/secure")


router.get("/",mw(["admin"]), (req, res, next) => {
    try {
        res.json({ msg: "Movies list are here", data: req.body});
    } catch (e) {
        next(e); 
    }
});
router.post("/",mw(["user","admin"]), (req,res,next)=>{
    try{
        res.json({msg:"new movie"})
    }catch(e){next(e)}
})
router.get("/:id", (req,res,next)=>{
    try{
        res.json({msg:`Details for Movieid ${req.params.id}`})
    }catch(e){next(e)}
})
router.put("/:id", (req,res,next)=>{
    try{
        res.json({msg:`Updated the movie of id ${req.params.id}`})
    }catch(e){next(e)}
})
router.patch("/:id/seats", (req,res,next)=>{
    try{
        res.json({msg:`Updated the single movie of id ${req.params.id}`})
    }catch(e){next(e)}
})

router.delete("/:id", (req,res,next)=>{
    try{
        res.json({msg:`Movie of id ${req.params.id} is removed`})
    }catch(e){next(e)}
})



module.exports = router;
