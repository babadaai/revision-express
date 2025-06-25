require("dotenv").config()

const express =require(`express`)
const app =express();

const indexRouter=require("./Routes/index")

const Port=Number(process.env.Port)
app.use(express.json())


app.use((req,res,next)=>{
    if (!req.body) req.body = {};
  req.body.country="us"
  req.body.currency="usd"
  req.body.currentTime= new Date().toISOString()

next();
})

app.use("/",indexRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ err: err.message }); 
});

    app.listen(Port,()=>{
        console.log(`app is running on port ${Port}`)
    })