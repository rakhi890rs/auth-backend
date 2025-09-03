const express = require("express")
const userModel = require("../models/user.model")

const router = express.Router()



router.post('/register',async(req,res)=>{
    const {username,password}= req.body;

    const user = await userModel.create({
        username,password
    })

    res.status(201).json({
        message:"user registered successfully",
        user
    })


    router.post('/login',async(req,res)=>{
        const {username,password} = req.body

        const isUserExists = await userModel.findOne({
            username:username
        })

        if(!isUserExists){
            return res.status(401).json({
                message:"user account not found"
            })
        }

        const isPasswordValidid = password == isUserExists.password
        if(!isPasswordValidid){
            return res.status(401).json({
                message:"Invalid password"
            })
        }
    })
})
module.exports = router