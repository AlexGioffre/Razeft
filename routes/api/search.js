const express = require('express');
const router = express.Router();
const searchControllers = require('../../controllers/search');

router.get('/:search', (req, res) => {
   searchControllers.getSearch(req, res);
});

module.exports = router;