const jwt = require('jsonwebtoken');
const keys = require('../config/index');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    //Check Token
    if(!token){
        return res.status(401).json({msg: 'No Token'});
    } else {
        try {
            const decoded = jwt.verify(token, keys.JWTSecret);
            req.user = decoded;
            next();
        } catch(e) {
            res.status(400).json({msg: 'Token is not valid'})
        }
    }

}

const noAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    //Check Token
    if(token){
        return res.status(401).json({msg: 'Logout before to Register or Login other account'});
    } else {
        next();
    }
}


module.exports = {auth, noAuth};