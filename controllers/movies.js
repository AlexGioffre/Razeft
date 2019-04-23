const axios = require('axios');
const keys = require('../config/index');

let movies = {};

const getMovies = (req, res) => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
        params:{
            api_key: keys.API_KEY,
            language: "en-US"
        }
    })
    .then(response => {
        movies.popular = [];
        response.data.results.forEach(moviesApi => {
            if(moviesApi.poster_path != null && moviesApi.backdrop_path != null){
                movies.popular.push(moviesApi);
            }
        })
        return movies
    })
    .then(data => {
        axios.get('https://api.themoviedb.org/3/discover/movie', {
            params:{
                api_key: keys.API_KEY,
                language: "en-US",
                sort_by: "popularity.desc",
                with_genres: 99
            }
        })
        .then(response => {
            movies.documentary = [];
            response.data.results.forEach(documentary => {
                if(documentary.poster_path != null && documentary.backdrop_path != null){
                    movies.documentary.push(documentary);
                }
            })
            return movies
        })
        .then(data => {
            axios.get('https://api.themoviedb.org/3/discover/movie', {
                params:{
                    api_key: keys.API_KEY,
                    language: "en-US",
                    sort_by: "popularity.desc",
                    with_genres: 36
                }
            })
            .then(response => {
                movies.history = [];
                response.data.results.forEach(histo => {
                    if(histo.poster_path != null && histo.backdrop_path != null){
                        movies.history.push(histo);
                    }
                })
                return movies;
            })
            .then(data => {
                axios.get('https://api.themoviedb.org/3/discover/movie', {
                params:{
                    api_key: keys.API_KEY,
                    language: "en-US",
                    sort_by: "popularity.desc",
                    with_genres: 16
                }
                })
                .then(response => {
                    movies.cartoon = [];
                    response.data.results.forEach(carto => {
                        if(carto.poster_path != null && carto.backdrop_path != null){
                            movies.cartoon.push(carto);
                        }
                    })
                    return movies;
                })
                .then(data => {
                    axios.get('https://api.themoviedb.org/3/discover/movie', {
                        params:{
                            api_key: keys.API_KEY,
                            language: "en-US",
                            sort_by: "popularity.desc",
                            with_genres: 80
                        }
                    })
                    .then(response => {
                        movies.crimes = [];
                        response.data.results.forEach(crime => {
                            if(crime.poster_path != null && crime.backdrop_path != null){
                                movies.crimes.push(crime);
                            }
                        })
                        res.json(movies);
                    })
                })
            })
        })
    })
}

module.exports = {getMovies};