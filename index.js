require("dotenv").config()

const express =require(`express`)
const app =express();
const morgan=require("morgan")
const mongoose = require('mongoose');

const indexRouter=require("./Routes/index")


mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("Database connected successfully")

}).catch((e)=>{
  console.log("Database Error", e)


})

const Port=Number(process.env.Port)
app.use(express.json())

app.use("/assets",express.static("public"))
app.use(morgan("dev"))

app.use("/",indexRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ err: err.message }); 
});

    app.listen(Port,()=>{
        console.log(`app is running on port ${Port}`)
    })