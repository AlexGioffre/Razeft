const express = require('express');
const router = express.Router();
const homeControllers = require('../../controllers/home');

router.get('/', (req, res) => {
    homeControllers.getDatas(req, res);
})

module.exports = router;