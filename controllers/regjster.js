const db = require('../db/connection');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../config/index');


const isValid = (user) => {
    const error = ""
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    const validName = typeof user.name == 'string' && user.name.trim() != '';
    const validEmail = typeof user.email == 'string' && user.email.trim() != '' && emailRegex.test(user.email);
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 5;

    return  validName && validEmail && validPassword;
}


const registerValid = (req, res) => {
    const {email, name, password} = req.body;
    if(isValid(req.body)){
        const hash = bcrypt.hashSync(password);
        db('users').where("name", "=", name.toLowerCase()).then(user => {
            if(user.length > 0){
                return res.status(400).json('username already used')
            } else {
                db.transaction(trx => {
                    trx.insert({
                        hash: hash,
                        email: email
                    }).into('login')
                    .returning('email')
                    .then(Loginemail => {
                        db('users')
                        .returning('*')
                        .insert({
                            email: Loginemail[0],
                            name: name.toLowerCase(),
                            joined: new Date()
                        })
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
                        .catch(err => res.status(400).json("Error with Database"));
                    })
                    .then(trx.commit)
                    .catch(err => {
                        res.status(400).json("Email already used");
                    })
                })
            }
        });
        
    } else {
        res.status(400).json('Please enter all fields correctly, a valid Email and a password length at least 6 characters');
     };
}


module.exports = {registerValid};