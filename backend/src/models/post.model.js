const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    img_url:{
        type:String,
        required:[true,"img is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user id is required for creating post"]
    }
})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel