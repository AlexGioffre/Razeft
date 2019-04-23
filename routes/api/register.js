const express = require('express');
const router = express.Router();
const registerControllers = require('../../controllers/regjster');


router.post('/', (req,res) => {
    registerControllers.registerValid(req, res);
})

module.exports = router;