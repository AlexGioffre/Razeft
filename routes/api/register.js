const express = require('express');
const router = express.Router();
const registerControllers = require('../../controllers/regjster');
const control = require('../../middleware/auth');

router.post('/', control.noAuth, (req,res) => {
    registerControllers.registerValid(req, res);
})

module.exports = router;