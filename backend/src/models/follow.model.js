const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:String,
    followee:String,
}, {timestamps:true})


const followModel = mongoose.model("follow",followSchema)

module.exports = followModel