import mongoose from "mongoose"

const User=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
})

const users=mongoose.model("users",User)

export default users