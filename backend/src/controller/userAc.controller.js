const followModel = require("../models/follow.model");
const userModel = require("../models/user.model")

async function followUserController(req,res) {
    const follower = req.username
    const followee = req.params.username
     
    if(followee === follower){
        return res.status(400).json({
            message:"User can't follow itself"
        })
    }
 
    const followeeValid = await userModel.findOne({
         username:followee
    })
    
    if(!followeeValid){
        return res.status(404).json({
            message:"user not found to follow"
        })
    }

    const alreadyFollowing = await followModel.findOne({
        follower,
        followee
    })

    if(alreadyFollowing){
        return res.status(200).json({
            message:"can't follow same user twice"
        })
    }

    const followRecord = await followModel.create({
        follower,
        followee
    })
   
    res.status(201).json({
        followed:true,
        message:`you started following ${followee}`,
        followRecord
    })
}
async function unfollowUserController(req,res){
    const follower = req.username
    const followee = req.params.username

     if(followee === follower){
        return res.status(400).json({
            message:"User can't unfollow yourself"
        })
    }

    const validFollowee = await userModel.findOne({
        username:followee
    })

    if(!validFollowee){
        return res.status(404).json({
            message:"user don't exist to unfollow"
        })
    }

    const followRecord = await followModel.findOne({
        follower,
        followee
    })

    if(!followRecord){
        return res.status(400).json({
            message:"you can't unfollow a user to whom you don't follow"
        })
    }

    const deleteRecord = await followModel.findByIdAndDelete(followRecord._id)

    res.status(204).json({
        message:`you unfollowed ${followee} successfully`,
        deleteRecord
    })
}

module.exports = {followUserController,unfollowUserController}