const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

async function Auth(req,res,next){
    try {

         const token  = req.headers.authorization.split(" ")[1]

         const decodedUser = await jwt.verify(token,JWT_SECRET)

         req.user = decodedUser
         next()
        
    } catch (error) {
        res.status(401).json({error: "Authentication Failed!"})
    }
}

module.exports={
    Auth
}