const express = require('express');
const router = express.Router();
const dataControllers = require('../../controllers/data');

router.get('/', (req, res) => {
    dataControllers.getDatas(req, res);
})

module.exports = router;