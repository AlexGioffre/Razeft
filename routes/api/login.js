const express = require('express');
const router = express.Router();
const loginControllers = require('../../controllers/login');
const control = require('../../middleware/auth');

router.post('/', control.noAuth ,(req,res) => {
    loginControllers.loginValid(req, res);
})

module.exports = router;