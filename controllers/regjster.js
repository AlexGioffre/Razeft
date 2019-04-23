const db = require('../db/connection');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../config/index');


const isValid = (user) => {
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    const validName = typeof user.name == 'string' && user.name.trim() != '' && user.name.trim().length >= 5;
    const validEmail = typeof user.email == 'string' && user.email.trim() != '' && emailRegex.test(user.email);
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

    return  validName && validEmail && validPassword;
}


const registerValid = (req, res) => {
    const {email, name, password} = req.body;
    if(isValid(req.body)){
        const hash = bcrypt.hashSync(password);
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
                    name: name,
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
                                user: {
                                    id: user[0].id,
                                    name: user[0].name,
                                    email: user[0].email
                                }
                            })
                        }
                    );
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    } else {
        res.json('invalid')
     };
}


module.exports = {registerValid};