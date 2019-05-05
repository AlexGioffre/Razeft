const axios = require('axios');
const keys = require('../config/index');

let home = {};

const getDatas = (req, res) => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
        params : {
        api_key: keys.API_KEY,
        language: "en-US"}
    })
    .then(response => {
        home.popularSeries = [];
        response.data.results.forEach(data => {
            if(data.poster_path != null && data.backdrop_path != null){
                home.popularSeries.push(data);
            }
        });
        return home;
    })
    .then(data => {
        axios.get('https://api.themoviedb.org/3/movie/popular', {
            params:{
                api_key: keys.API_KEY,
                language: "en-US"
            }
        })
        .then(response => {
            home.popularMovies = [];
            response.data.results.forEach(data => {
                if(data.poster_path != null && data.backdrop_path != null){
                    home.popularMovies.push(data);
                }
            })
            return home;
        })
        .then(data => {
            axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: keys.API_KEY,
                    language: "en-US",
                    sort_by: "popularity.desc",
                    with_genres: 27
                }
            })
            .then(response => {
                home.horrorMovies = [];
                response.data.results.forEach(data => {
                    if(data.poster_path != null && data.backdrop_path != null){
                        home.horrorMovies.push(data);
                    }
                })
                return home;
            })
            .then(data => {
                axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params: {
                        api_key: keys.API_KEY,
                        language: "en-US",
                        sort_by: "popularity.desc",
                        with_genres: 16,
                        with_original_language: "ja"
                    }
                })
                .then(response => {
                    home.anime = [];
                    response.data.results.forEach(data => {
                        if(data.poster_path != null && data.backdrop_path != null){
                            home.anime.push(data);
                        }
                    })
                    return res.json(home);
                })
                .catch(err => console.log('Problem'));
            })
        })
    })
}

module.exports = {
    getDatas
};