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
    })
})
module.exports = router