const customAPIError=require('../errors/custom-error')
const jwt=require('jsonwebtoken')
const {authorization, Unauthorized}=require('../errors')

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith('Bearer')){
        throw new Unauthorized('no token provided')
    }
    const token =authHeader.split(' ')[1]
    try {
        const decoded=jwt.verify(token,process.env.JWT_TOKEN)
        const {id,username}=decoded
        req.user={id,username}
        next()
    } catch (error) {
        throw new Unauthorized('not authorized to access this route')
    }
}

module.exports=authMiddleware