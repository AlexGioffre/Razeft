const jwt = require('jsonwebtoken');
const keys = require('../config/index');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    //Check Token
    if(!token) return res.status(401).json({error: "No Token, authorizaton denied"});

    //Verify Token
    try {
        const decoded = jwt.verify(token, keys.JWTSecret);
        //Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({error: 'Token is not valid'})
    }

}


module.exports = auth;