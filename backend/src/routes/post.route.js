const postModel = require("../models/post.model")
const express = require("express")
const postControllers = require("../controller/post.controller")
const multer = require("multer") //we use multer to accept formdata [accept files]
const upload = multer({storage:multer.memoryStorage()}) 
//where should we upload currently in ram as buffer

const authUser = require("../middleware/authUser.middleware")


const postRouter = express.Router();
//img wala attribute ke pass file rhega i.e image use as a buffer ram mein store krna

postRouter.post("/",upload.single("img"),authUser.identifyUser,postControllers.createPostController)
postRouter.get("/allPost",authUser.identifyUser,postControllers.getAllPostController)
postRouter.get("/postDetails/:postId",authUser.identifyUser,postControllers.getPostDetailsController)
postRouter.post("/like/:pId",authUser.identifyUser,postControllers.likePostController)
module.exports  = postRouter


//yayyyy docs padhna aagayaaa