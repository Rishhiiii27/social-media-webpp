const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signupController = async(req,res)=>
{
    try{
    const {email,password}=req.body;

    if(!email || !password)
    {
         res.send("all fields are mandatory")
    }

    const olduser = await User.findOne({email});
    if(olduser)
    {
        res.status(409).send("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        email,
        password:hashedPassword,
    });

    return res.json({
        user,
    });

    }catch(error)
    {
        console.log(error);
    }
}


const loginController = async(req,res)=>
{
    try{
    const{email,password}=req.body;

    if(!email || !password)
    {
        res.send('all fileds are mandatory');
    }
    const user = await User.findOne({email})
    if(!user)
    {
        res.send("email doesn't exist");
    }

    const matched = await bcrypt.compare(password,user.password);
    if(!matched)
    {
        res.send('incorrect password')
    }

    const accessToken = generateAccessToken({id:user._id})
    const refreshToken = generateRefreshToken({id:user._id})


    return res.json({accessToken,refreshToken})
}catch(error){}

}

const refreshAccessTokenController = async(req,res)=>
{
   
     const{refreshToken} = req.body;

        if(!refreshToken)
        {
           return res.send("refresh token needed")
        }
        try{
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);

        const _id = decoded._id;
        const accessToken = generateAccessToken({_id});

        return res.send({accessToken});

    }catch(error){
        console.log(error);
        return res.send("invalid refresh token")
    }
}

const generateAccessToken = (data)=>
{
    try{
        const token = jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{
            expiresIn :'15m',
        });
        console.log(token);
        return token;
    }catch(error){
        console.log(error)
    }
}

const generateRefreshToken =(data)=>
{
    try{
        const token = jwt.sign(data,process.env.REFRESH_TOKEN_PRIVATE_KEY,{
            expiresIn:'1y'
        })
        console.log(token);
        return token;
    }catch(error){
        console.log(error)
    }

}

module.exports = {signupController,loginController,refreshAccessTokenController}