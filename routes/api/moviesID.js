const express = require('express');
const router = express.Router();
const moviesIdControllers = require('../../controllers/moviesId');
const auth = require('../../middleware/auth');


router.get('/:id', (req, res) => {
    moviesIdControllers.getMovie(req, res);
});

router.put('/:id/like', auth ,(req,res) => {
    moviesIdControllers.likeMovie(req, res);
})

module.exports = router;