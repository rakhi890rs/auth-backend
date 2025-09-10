const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username, password
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);
    res.cookie("token")

    res.status(201).json({
        message: "user registered successfully",
        user
        
    });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const isUserExists = await userModel.findOne({
        username: username
    });

    if (!isUserExists) {
        return res.status(401).json({
            message: "user account not found"
        });
    }

    const isPasswordValidid = password == isUserExists.password;
    if (!isPasswordValidid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    res.status(200).json({
        message: "user loggeIn successfully"
    });
});


router.get('/user',async(req,res)=>{
  try{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findOne({
        _id:decoded.id
    }).select("-password - __v")
    res.status(200).json({
        message:"User data fetched successfully",
        user
    })
    res.send(decoded)

}catch(err){
    return res.status(401).json({
        message:"Unauthorized-Invalid token"
    })
}
})


module.exports = router;
