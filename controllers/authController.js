const jwt = require('jsonwebtoken')
const {expressjwt:expressJWT} = require('express-jwt')

exports.login = (req,res)=>{
    const {username,password} = req.body
    if(username === process.env.USER && password === process.env.PASSWORD){
        // Login
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'30m'})
        return res.json({token,username})
    }else{
        return res.status(400).json({error:'Username or Password is invalid'})
    }
}

// Check Token
exports.requireLogin = expressJWT({
    secret : process.env.JWT_SECRET,
    algorithms : ['HS256'],
    userProperty : 'auth'
})
