const express = require("express");
const userAcController = require("../controller/userAc.controller")
const authUser = require("../middleware/authUser.middleware")


// userAc = user Activity
const userACRouter = express.Router();

userACRouter.post('/follow/:username',authUser.identifyUser,userAcController.followUserController)
userACRouter.delete('/unfollow/:username',authUser.identifyUser,userAcController.unfollowUserController)
userACRouter.get('/follow/request',authUser.identifyUser,userAcController.getFollowRequestsController)
userACRouter.patch('/follow/request/accept/:followId',authUser.identifyUser,userAcController.acceptFollowRequestsController)
userACRouter.delete('/follow/request/reject/:followId',authUser.identifyUser,userAcController.rejectFollowRequestsController)

module.exports = userACRouter