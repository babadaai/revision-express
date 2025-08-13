const { required } = require("joi")
const {Schema,model, default: mongoose}= require("mongoose")
const userSchema= new Schema({
    name:{type:String, required:true},
    email:{tyoe:String, required:true, unique:true},
   /* validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },*/
    password:{type:String, required:true},
    phoneNum:number,
    role:[{type:String,enum:["admin","user"],default:"user", required:true}],
    isEmailVerifed:{type:Boolean, required:true,default:false},
    isActive:{type:Boolean, required:true,default:false},
    image:{type:String}

},
{timestamp:true}
)




module.exports=model("user",userSchema)
