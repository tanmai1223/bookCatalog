import express from "express"

export const validateUser=(req,res,next)=>{
    const {name,email,password}=req.body
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!name || name.length<=2){
     return res.status(400).json({message:"Name is not valid"})
    }

    if(!email || !regex.test(email)){
        return res.status(400).json({message:"Email is not valid"})
    }

    if(!password || !passregex.test(password)){
        return res.status(400).json({message:"Password is not valid"})
    }
    next()
    
}