require("dotenv").config()

const express =require(`express`)
const app =express();

const indexRouter=require("./Routes/index")

const Port=Number(process.env.Port)
app.use(express.json())

app.use("/",indexRouter);

app.use((err, req, res, next) => {
  console.error({ app: err });
  res.status(500).json({ err: "Something went wrong." });
});

    app.listen(Port,()=>{
        console.log(`app is running on port ${Port}`)
    })