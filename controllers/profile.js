const db = require('../db/connection');


const getUser = (req, res) => {
    const { id } = req.user;
    db.select('*').from('users').where({id})
        .then(user => {
            let dd = user[0].joined.getDate();
            let yy = user[0].joined.getFullYear();
            let mm = user[0].joined.getMonth()+1;
            if(mm < 10){
                mm = `0${mm}`;
            } else {
                mm = mm;
            }
            if(dd < 10 ){
                dd = `0${dd}`;
            } else {
                dd = dd;
            }
            let date = `${dd}/${mm}/${yy}`;
        if (user.length) {
            res.json({
                id: user[0].id,
                name: user[0].name,
                joined: date,
                tvSeries: user[0].tvseries,
                movies: user[0].movies
            })
        } else {
            res.status(400).json('Not found')
        }
        })
        .catch(err => res.status(400).json('error getting user'))
}


module.exports = {
    getUser
}