const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:String,
    followee:String,
    status:{
        type:String,
        default:"pending",
        enum:{
          values:["pending","accepted","rejected"], // enum allow only specific input to get accepted
          message: "status can only be pending, accepted or rejected"
        }
    }
}, {timestamps:true})


const followModel = mongoose.model("follow",followSchema)

module.exports = followModel