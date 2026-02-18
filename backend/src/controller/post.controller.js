const postModel = require("../models/post.model");
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT, // This is the default and can be omitted
});


async function createPostController(req,res) {
  
  const img =   await client.files.upload({
  file: await toFile(req.file.buffer,req.file.originalname),
  fileName: req.file.originalname,
  folder:"insta-clone-postImg"
});

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:img.url,
        user:req.user
    })
    res.status(201).json({
        message:"Post has been created",
        post
    })
}
async function getAllPostController(req,res) {
    
    const userId = req.user;

    const post = await postModel.find({
        user:userId
    })
   
    res.status(200).json({
        post
    })
}
async function getPostDetailsController(req,res) {
    const postId = req.params.postId
       
    
    const userId = req.user;
   
 
    const post = await postModel.findOne({
        _id:postId
    })
    
    const validUser = post.user.toString() === userId  // convert objectId to string
    
   if(!validUser){
    return res.status(403).json({
        message:"forbidden content"
    })
   }

    res.status(200).json({
        post,
        validUser
    })

}
async function likePostController(req,res) {
  

    const postId = req.params.pId;
    
    const user = req.username;

    const isPostValid = await postModel.findOne({_id:postId})

    if(!isPostValid){
        return res.status(404).json({
            message:"Post doesnt exist"
        })
    }

    const alreadyLiked = await likeModel.findOne({
         user,
         post:postId
    })

    if(alreadyLiked){
        return res.status(400).json({
            message:"can't like same post twice"
        })
    }

    const likeRecord = await likeModel.create({
        user,
        post:postId
    })

    res.status(201).json({
         message:"you liked this the post",
         likeRecord
    })

    
}

module.exports = {createPostController,getAllPostController,getPostDetailsController,likePostController}