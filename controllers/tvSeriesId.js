const axios = require('axios');
const keys = require('../config/index');
const db = require('../db/connection');

let series = {};

const getSeries = (req, res) => {
    series = {};
    axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}`, {
    params : {
            api_key: keys.API_KEY,
            language: "en-US"
        }
    })
    .then(response => {
        series.dettail = response.data;
        return series;
    })
    .then(data => {
        axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/credits`, {
            params: {
                api_key: keys.API_KEY,
                language: "en-US"
            }
        })
        .then(response => {
            series.cast = [];
            series.crew = [];
            response.data.cast.map(data => {
                if(data.profile_path != null){
                    series.cast.push(data);
                }
            });
            response.data.crew.map(data => {
                if(data.profile_path != null){
                    series.crew.push(data);
                }
            })
            return series;
        })
        .then(data => {
            axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/external_ids`, {
                params: {
                    api_key: keys.API_KEY,
                    language: "en-US"
                }
            })
            .then(response =>{
                series.social = response.data;
                return series;
            })
            .then(data => {
                    axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/images`, {
                    params: {
                        api_key: keys.API_KEY,
                        language: "en-US",
                        include_image_language: "en, null"
                    }
                })
                .then(response => {
                    series.images = {};
                    series.images.poster = response.data.posters;
                    series.images.backdrops = response.data.backdrops;
                    return series;
                })
                .then(data => {
                    axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/videos`, {
                        params: {
                            api_key: keys.API_KEY,
                            language: "en-US"
                        }
                    })
                    .then(response => {
                        series.videos = [];
                        response.data.results.map(data => {
                            if(data.type === "Teaser" || data.type === "Trailer") {
                                series.videos.push(data);
                            }
                        })
                        res.json(series)
                    })
                })
            })
        })
    })
}


const likeSeries = (req, res ) => {
    const { id } = req.user;
    db('users').select('tvseries').where({id}).then(user => {
       if(user.length > 0) {
        if(user[0].tvseries === null || user[0].tvseries.length === 0){
            db('users').where({id}).update({
                tvseries: db.raw('array_append(tvseries, ?)', [req.params.id])
            }).then(user => {
                res.json({msg: 'TV series add on list'})
            })
        } else {
            let check = false;
            for(var i = 0; i < user[0].tvseries.length; i++){
                if(user[0].tvseries[i] === req.params.id){
                    check = false;
                    db('users').where({id}).update({
                        tvseries: db.raw('array_remove(tvseries, ?)', [req.params.id])
                    }).then(user => {
                        return res.json({msg: 'Delete from list'})
                    })
                } else{
                    check = true;
                }
            }

            if(check){
                db('users').where({id}).update({
                    tvseries: db.raw('array_append(tvseries, ?)', [req.params.id])
                }).then(user => {
                    res.json({msg: 'TV series add on list'})
                })
            }
        }
       } else {
           res.json('user not exist');
       }
    });
}


module.exports = {getSeries, likeSeries};