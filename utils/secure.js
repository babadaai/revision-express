const checkRole=(userRole,sysrole)=>
{
  return userRole.some((iteam) => sysrole.includes(iteam)) };


const mw=(sysrole)=>{
    return (req,res,next)=>{
        const {role}=req.headers;
        const result= checkRole([role],sysrole)
        console.log({role})
            if(!result) {res.status(400).json({msg: "Unauthorized"})}
                next();

}
}
module.exports={checkRole,mw}