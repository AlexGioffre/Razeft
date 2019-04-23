const axios = require('axios');
const keys = require('../config/index');

let shows = [];

const getSearch = (req, res) => {
    shows = [];
    axios.get('https://api.themoviedb.org/3/search/multi', {
    params : {
            api_key: keys.API_KEY,
            language: "en-US",
            query: req.params.search
        }
    })
    .then(response => {
        response.data.results.forEach(data => {
            if((data.media_type === "tv" && data.poster_path !== null) || (data.media_type === "movie" && data.poster_path != null) ){
                shows.push(data);
            }
        });
        res.json(shows);
    })
}

module.exports = {getSearch};