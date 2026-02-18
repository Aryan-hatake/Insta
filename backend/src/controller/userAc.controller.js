const { default: mongoose } = require("mongoose");
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
async function getFollowRequestsController(req,res) {
     const user = req.username
     
     const followRecords = await followModel.find({
        followee:user,
        status:"pending"
})
     
     if(followRecords.length===0){
        return res.status(200).json({
            message:"No follow request till now"
        })
     }
   
     res.status(200).json({
         allRequest:followRecords
     })
}
async function acceptFollowRequestsController(req,res) {
    const user = req.username
    const followId = req.params.followId

    let followRecord;

    try{
         followRecord = await followModel.findById(followId);
    }
    catch(err){
           return res.status(400).json({
                message:'non existent follow request'
            })
    }
    
    if(followRecord.followee !== user ){
        return res.status(403).json({
            message:"forbidden act"
        })
    }
     
    if(followRecord.status==="accepted"){
        return res.status(400).json({
            message:`${followRecord.follower}'s request has been already accepted`
        })
    }


        followRecord.status = "accepted";
    
    
    await followRecord.save(); 

    res.status(200).json({
        message:`${followRecord.follower}'s request accepted successfully`,
        followRecord
    })
}
async function rejectFollowRequestsController(req,res) {
    const user = req.username;
    const followId = req.params.followId;



    let followRecord;
    
    
         followRecord = await followModel.findById(followId);
    
     if(!followRecord){
        return res.status(400).json({
            message:"Non existent follow request"
        })
    }

     
    if(followRecord.followee !== user){
        return res.status(403).json({
            message:"forbidden act"
        })
    }

    if(followRecord.status === "accepted"){
         return res.status(400).json({
            message:"follow request has been accepted try removing from followers"
         })
    }

    const deleteRecord = await followModel.findByIdAndDelete(followId)

    return res.status(200).json({
        message:`${followRecord.follower}'s request has been rejected successfully`,
        deleteRecord
    })

}


module.exports = {followUserController,unfollowUserController,getFollowRequestsController,acceptFollowRequestsController,rejectFollowRequestsController}