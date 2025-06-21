const express = require("express");
const router = express.Router();

const movieRouter=require("../modules/movies/movie.api")
const orderRouter=require("../modules/order/order.api")
const usersRouter=require("../modules/users/users.api")
router.use("/api/v1/users", usersRouter)
router.use("/api/v1/movies", movieRouter)
router.use("/api/v1/order", orderRouter)

router.get("/api/v1" ,  (req, res, next)=>{
      try{
          res.json({msg:"api is working "})
      }
      catch(e){
        next(e)
      }
})

module.exports = router;
