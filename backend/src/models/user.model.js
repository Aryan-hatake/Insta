const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"User with same email already exist"],
        required:true
    },
    username:{
        type:String,
        unique:[true,"Username not available"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profile_img:{
        type:String,
        default:"https://ik.imagekit.io/2chp5tqv4/download.jpg"
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel