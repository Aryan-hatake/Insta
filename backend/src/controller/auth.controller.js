const userModel = require("../models/user.model")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function registerController(req, res) {
    const { email, password, username } = req.body;

    const userExist = await userModel.findOne({
        $or: [
            {
                email
            },
            {
                username
            }
        ]
    })

    console.log(userExist)

    if(userExist){
       return  res.status(409).json({
            success:false,
            message:userExist.email === email ?  "User with same Email exist":"Username is not available"
        })
    }

    
   
    const user = await userModel.create({
        email,
        username,
        password: await bcrypt.hash(password,10)
    })


    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )
    
    res.cookie("jwt",token)

    res.status(201).json({

        success:true,
        message:"User has been registered successfully",
        token


    })

    
}
async function loginController(req,res){

    const {email,password,username} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User does not exist"
        })
    }

   

    isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            success:false,
            message:"Invalid Password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt",token)

    res.status(200).json({
        success:true,
        message:"User Logged in successfully"
    })
}

module.exports = {registerController,loginController}