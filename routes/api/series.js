const express = require('express');
const router = express.Router();
const series = require('../../controllers/tvSeries')

router.get('/', (req, res) => {
    series.getSeries(req, res);
});

module.exports = router;