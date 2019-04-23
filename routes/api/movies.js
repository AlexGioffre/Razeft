const express = require('express');
const router = express.Router();
const movieControllers = require('../../controllers/movies')

router.get('/', (req, res) => {
    movieControllers.getMovies(req, res);
});

module.exports = router;