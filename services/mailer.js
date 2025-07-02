const nodemailer=require("nodemailer");
require("dotenv").config();

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",

    port:465,
    secure:true,
    auth:{
        user:process.env.SMTP_USERNAME,
        pass:process.env.SMTP_PASSWORD,
    }


})

const sendMail=async({email,subject,htmlMsg})=>{
     const {messageID} = await transporter.sendMail({
    from: `"Nischal" <${process.env.SMTP_USERNAME}>`,
    to: email,
    subject,
    text: "Hello world?", // plain‑text body
    html:htmlMsg
     })
     return messageID;

}
module.exports={sendMail}