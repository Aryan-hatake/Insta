const ImageKit =  require('@imagekit/nodejs')
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const postModel = require("../models/post.model")


const client = new ImageKit({
    privateKey:process.env.IMAGE_KIT
})
async function createPostController(req,res) {
 
    const jwt_token  = req.cookies.jwt
    
    if(!jwt_token){
        return res.status(404).json({
            message:"token not found"
        })
    }

    let verifiedToken = null;
    try{
         verifiedToken = jwt.verify(jwt_token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized Token"
        })
    }
    const file = await client.files.upload({
        file:await toFile(req.file.buffer,'file'),
        fileName:req.file.originalname,
        folder:"/cohort-instaclone-post"
    })
    

    const post = await postModel.create({
        caption:req.body.caption,
        img_url:file.url,
        user:verifiedToken.id
    })
    

    res.status(201).json({
        message:"post has been created successfully"
    })
}

module.exports = {createPostController}