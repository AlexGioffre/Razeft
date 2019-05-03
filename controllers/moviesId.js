const axios = require('axios');
const keys = require('../config/index');
const db = require('../db/connection');

let movie = {};

const getMovie = (req, res) => {
    movie = {};
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
    params : {
            api_key: keys.API_KEY,
            language: "en-US"
        }
    })
    .then(response => {
        movie.dettail = response.data;
        return movie;
    })
    .then(data => {
        axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits`, {
            params: {
                api_key: keys.API_KEY,
                language: "en-US"
            }
        })
        .then(response => {
            movie.cast = [];
            movie.crew = [];
            response.data.cast.map(data => {
                if(data.profile_path != null){
                    movie.cast.push(data);
                }
            });
            response.data.crew.map(data => {
                if(data.profile_path != null){
                    movie.crew.push(data);
                }
            })
            return movie;
        })
        .then(data => {
            axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/external_ids`, {
                params: {
                    api_key: keys.API_KEY,
                    language: "en-US"
                }
            })
            .then(response =>{
                movie.social = response.data;
                return movie;
            })
            .then(data => {
                    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/images`, {
                    params: {
                        api_key: keys.API_KEY,
                        language: "en-US",
                        include_image_language: "en, null"
                    }
                })
                .then(response => {
                    movie.images = {};
                    movie.images.poster = response.data.posters;
                    movie.images.backdrops = response.data.backdrops;
                    return movie;
                })
                .then(data => {
                    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/videos`, {
                        params: {
                            api_key: keys.API_KEY,
                            language: "en-US"
                        }
                    })
                    .then(response => {
                        movie.videos = [];
                        response.data.results.map(data => {
                            if(data.type === "Teaser" || data.type === "Trailer") {
                                movie.videos.push(data);
                            }
                        })
                        res.json(movie)
                    })
                })
            })
        })
    })
}


const likeMovie = (req, res ) => {
    const { id } = req.user;
    db('users').select('movies').where({id}).then(user => {
        if(user.length > 0) {
            if(user[0].movies === null || user[0].movies.length === 0){
                db('users').where({id}).update({
                    movies: db.raw('array_append(movies, ?)', [req.params.id])
                }).then(user => {
                    res.json('Add on list, click on icon to see your favorite shows')
                })
            } else {
                let check = false;
                for(var i = 0; i < user[0].movies.length; i++){
                    if(user[0].movies[i] === req.params.id){
                        check = false;
                        db('users').where('id', '=', req.user.id).update({
                            movies: db.raw('array_remove(movies, ?)', [req.params.id])
                        }).then(user => {
                            return res.json('Delete from list, click on icon to see your favorite shows')
                        })
                    } else{
                        check = true;
                    }
                }

                if(check){
                    db('users').where('id', '=', req.user.id).update({
                        movies: db.raw('array_append(movies, ?)', [req.params.id])
                    }).then(user => {
                        res.json('Add on list, click on icon to see your favorite shows')
                    })
                }
            }
        } else {
            res.json('user not exist');
        }
    });
}

module.exports = {getMovie, likeMovie};