const testApi=(req,res)=>{
    return res.status(200).json(
        {
            message:"ok", data:"testapi"
        }
    )
}
const handleRegister=(req,res)=>{
    console.log("test api");
    console.log(req.body);
}
module.exports={testApi,handleRegister}