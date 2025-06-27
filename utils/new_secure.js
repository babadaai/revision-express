const {checkRole, verifyToken}=require("./jwt")


const secure=(sysRole)=>{
    return (req,res,next)=>{
        try{
        const {token}=req.headers
        //check if token exist or not
        if(!token) throw new Error("Token is missing") 
        const isValid=verifyToken(token)
        if(!isValid) throw new Error("Token is expired ")
            const {data}=isValid
            console.log({data,sysRole})
            const validRole=checkRole({sysRole,userRole:data?.role || [] })
            if(!validRole) throw new Error("User unauthorized")
            next();
    }
catch(e){
    next(e);
}
}

}
module.exports={secure}