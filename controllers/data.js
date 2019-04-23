const axios = require('axios');
const keys = require('../config/index');

let datas = {};

const getDatas = (req, res) => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
        params : {
        api_key: keys.API_KEY,
        language: "en-US"}
    })
    .then(response => {
        datas.popularSeries = [];
        response.data.results.forEach(data => {
            if(data.poster_path != null && data.backdrop_path != null){
                datas.popularSeries.push(data);
            }
        });
        return datas;
    })
    .then(data => {
        axios.get('https://api.themoviedb.org/3/movie/popular', {
            params:{
                api_key: keys.API_KEY,
                language: "en-US"
            }
        })
        .then(response => {
            datas.popularMovies = [];
            response.data.results.forEach(data => {
                if(data.poster_path != null && data.backdrop_path != null){
                    datas.popularMovies.push(data);
                }
            })
            return datas;
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
                datas.horrorMovies = [];
                response.data.results.forEach(data => {
                    if(data.poster_path != null && data.backdrop_path != null){
                        datas.horrorMovies.push(data);
                    }
                })
                return datas;
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
                    datas.anime = [];
                    response.data.results.forEach(data => {
                        if(data.poster_path != null && data.backdrop_path != null){
                            datas.anime.push(data);
                        }
                    })
                    return res.json(datas);
                })
                .catch(err => console.log('Problem'));
            })
        })
    })
}

module.exports = {
    getDatas
};