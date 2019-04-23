const axios = require('axios');
const keys = require('../config/index');

let series = {};

const getSeries = (req, res) => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
        params : {
        api_key: keys.API_KEY,
        language: "en-US"}
    })
    .then(response => {
        series.popularSeries = [];
        response.data.results.forEach(data => {
            if(data.poster_path != null && data.backdrop_path != null) {
                series.popularSeries.push(data);
            }
        })
        return series;
    })
    .then(data => {
        axios.get('https://api.themoviedb.org/3/tv/popular', {
            params : {
            api_key: keys.API_KEY,
            language: "en-US"}
        })
        .then(response => {
            series.popularSeries = [];
            response.data.results.forEach(data => {
                if(data.poster_path != null && data.backdrop_path != null) {
                    series.popularSeries.push(data);
                }
            })
            return series;
        })
        .then(data =>
           { axios.get('https://api.themoviedb.org/3/discover/tv', {
                params: {
                    api_key: keys.API_KEY,
                    language: "en-US",
                    sort_by: "popularity.desc",
                    with_genres: 35,
                    without_genres: 16
                }
            })
            .then(response => {
                series.comedy = [];
                response.data.results.forEach(come => {
                    if(come.poster_path != null && come.backdrop_path != null) {
                        series.comedy.push(come);
                    }
                })
                return series;
            })
            .then(data => {
                axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params: {
                        api_key: keys.API_KEY,
                        language: "en-US",
                        sort_by: "popularity.desc",
                        with_genres: 10768,
                        without_genres: 16
                    }
                })
                .then(response => {
                    series.politics = [];
                    response.data.results.forEach(pol => {
                        if(pol.poster_path != null && pol.backdrop_path != null) {
                            series.politics.push(pol);
                        }
                    })
                    return series;
                })
                .then(data => {
                    axios.get('https://api.themoviedb.org/3/discover/tv', {
                        params: {
                            api_key: keys.API_KEY,
                            language: "en-US",
                            sort_by: "popularity.desc",
                            with_genres: 10751,
                            without_genres: 16
                        }
                    })
                    .then(response => {
                        series.family = [];
                        response.data.results.forEach(fam => {
                            if(fam.poster_path != null && fam.backdrop_path != null) {
                                series.family.push(fam);
                            }
                        })
                        return series;
                    })
                    .then(data => {
                        axios.get('https://api.themoviedb.org/3/discover/tv', {
                            params: {
                                api_key: keys.API_KEY,
                                language: "en-US",
                                sort_by: "popularity.desc",
                                with_genres: 10764,
                                without_genres: 16
                            }
                        })
                        .then(response => {
                            series.reality = [];
                            response.data.results.forEach(real => {
                                if(real.poster_path != null && real.backdrop_path != null){
                                    series.reality.push(real);
                                }
                            })

                            res.json(series);
                        })
                    })
                })
            })
        })
    })
}

module.exports = {getSeries};