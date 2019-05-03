const express = require('express');
const router = express.Router();
const tvSeriesIdController = require('../../controllers/tvSeriesId');
const control = require('../../middleware/auth');

router.get('/:id', (req, res) => {
    tvSeriesIdController.getSeries(req,res);
});


router.put('/:id/like', control.auth, (req, res) => {
    tvSeriesIdController.likeSeries(req, res);
})
module.exports = router;