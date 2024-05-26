export const sendMessage=async(req,resp)=>{
    const{firstName,lastName,email,phone,message}=req.body;

    if (!firstName || !lastName || !email ||!phone || ! message){
        return resp.status(400).json({
            success:"False",
            message:"Please Fill Full Form"
        })
    }

}