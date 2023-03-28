const {User} = require('../model/Usermodel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const otpGenerator = require('otp-generator')

async function register(req, res) {
  try {
    const {
      username,
      password,
      profile,
      email,
      mobile,
      firstname,
      lastname,
      address,
    } = req.body;

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ error: "Please use unique username" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ error: "Please use unique email" });
    }

    const existMobile = await User.findOne({mobile});
    if (existMobile) {
      return res.status(400).json({error: "Please use a unique mobile"})
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
      mobile,
      firstname,
      lastname,
      address,
    });

    await newUser.save();

    return res.status(201).json({ msg: "User Register Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// middleware for verify user
async function verifyUser(req,res,next){
  try {

    const {username} = req.method =="GET" ? req.query : req.body
    let exist = User.findOne({username})
    if(!exist){
      res.status(404).send({error:"User not found"})
    }else{
      next()
    }
    
  } catch (error) {
    res.status(404).send({error:"Authentication error"})
  }
}


async function login(req, res) {
  
  const {username,password}=req.body
  try {
    const existUser = await User.findOne({username})
    if(existUser){

      const encryptedPassword = await bcrypt.compare(password,existUser.password)
      if(!encryptedPassword){
        return res.status(400).json({error:"Incorrect Password"})
      }else{
        const token= jwt.sign({
          userId:existUser._id,
          username:existUser.username
        },JWT_SECRET,{expiresIn:"24h"})
        return res.status(200).send({
          message:"Login Successful",
          username:existUser.username,
          token
        })
      }

    }else{
      return res.status(400).json({error:"User didn't exist"})
    }
    
  } catch (error) {

    return res.status(500).send({error})
    
  }
    
  }


async function getUser(req, res) {
    const {username}=req.params
    try {
      if(!username){
        res.status(500).send({error : "Invalid username"})
      }else{
        const existUser = await User.findOne({username})
        if(!existUser){
          res.status(501).send({error:"Couldn't find the user"})
        }
        else{
          const {password,...rest} = Object.assign({},existUser.toJSON())
          res.status(201).send(rest)
        }
      }
      
    } catch (error) {
      res.status(404).send({error})
    }
}

async function updateUser(req, res) {
  const {userId} = req.user

  try {

    if(userId){
      const body = req.body

      await User.updateOne({_id:userId},body)
      res.status(201).send({message:"Record Updated"})
    }
    
  } catch (error) {
    res.status(401).send({error})
  }
}

async function generateOTP(req,res){
  req.app.locals.OTP = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
  res.status(201).send({code: req.app.locals.OTP})
}

async function verifyOTP(req,res){
  const{ code } = req.query
  if(parseInt(req.app.locals.OTP)==parseInt(code)){
    req.app.locals.OTP=null
    req.app.locals.resetSession=true
    return res.status(201).send({message:"Verification Successful"})
  }else{
    res.status(401).send({error:"Invalide OTP"})
  }
}

async function createResetSession(req, res) {
  if(req.app.locals.resetSession){
    req.app.locals.resetSession=false
    return res.status(201).send({message:"Access granded"})
  }else{
    return res.status(440).send({error:"Session expired"})
  }
}

async function resetPassword(req, res) {

  if(req.app.locals.resetSession){
    try {
      const {username,password}=req.body
      try {
        const user= await User.findOne({username})
        if(user){
          const hashedPassword = await bcrypt.hashSync(password,10)
          const data = await User.updateOne({username:user.username},{password:hashedPassword})
          if(!data){
            return res.status(403).send({error})
          }
          else{
            req.app.locals.resetSession=false
            return res.status(201).send({message : "Record updated"})
          }
        }else{
          return res.status(404).send({error:"User not found"})
        }
        
      } catch (error) {
        res.status(500).send({error:"Unable to change password"})
      }
    } catch (error) {
      res.status(500).send({error})
    }
  }else{
    return res.status(440).send({error:"Session expired"})
  }
}

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  createResetSession,
  resetPassword,
  verifyUser,
  generateOTP,
  verifyOTP,
};
