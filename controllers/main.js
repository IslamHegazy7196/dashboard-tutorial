const customAPIError=require('../errors/custom-error')
const {BadRequest}=require('../errors')

const jwt=require('jsonwebtoken')

const login = (req, res) => {
    const {username,password}=req.body
    if(!username||!password){
        throw new BadRequest ('please provise username and password')
    }
const id =new Date().getDate()
const token=jwt.sign({id,username},process.env.JWT_TOKEN,{expiresIn:'30d'})
  res.status(200).json({msg:'user created',token});
};

const dashboard = (req, res) => {
    
  const luckyNumber = Math.floor(Math.random() * 1000);
  res
    .status(200)
    .json({
      msg: `hello, ${req.user.username}`,
      secret: `here is your lucky number ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };
