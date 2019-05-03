const db = require('../db/connection');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../config/index');

const isValid = (user) => {
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    const validEmail = typeof user.email == 'string' && user.email.trim() != '' && emailRegex.test(user.email);
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

    return   validEmail && validPassword;
}


const loginValid = (req, res) => {
    if(isValid(req.body)){
        const { email, password } = req.body;
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
           const login = bcrypt.compareSync(password, data[0].hash);
           if(login) {
             return  db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    jwt.sign(
                        {id: user[0].id},
                        keys.JWTSecret,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: user[0]
                            })
                        }
                    );
                })
                .catch(err => res.status(400).json('Impossible get User'));
           } else {
               return res.status(400).json('Email or Password wrong, try again!')
           }
        })
        .catch(err => res.status(400).json('User not exist'));
    } else {
        return res.status(400).json('Not valid Email');
    }
}


module.exports = {loginValid};