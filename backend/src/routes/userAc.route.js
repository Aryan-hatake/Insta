const express = require("express");
const userAcController = require("../controller/userAc.controller")
const authUser = require("../middleware/authUser.middleware")


// userAc = user Activity
const userACRouter = express.Router();

userACRouter.post('/follow/:username',authUser.identifyUser,userAcController.followUserController)
userACRouter.delete('/unfollow/:username',authUser.identifyUser,userAcController.unfollowUserController)


module.exports = userACRouter