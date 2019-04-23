const express = require('express');
const router = express.Router();
const loginControllers = require('../../controllers/login');

router.post('/', (req,res) => {
    loginControllers.loginValid(req, res);
})

module.exports = router;