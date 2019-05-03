const express = require('express');
const router = express.Router();
const profileControllers = require('../../controllers/profile');
const control = require('../../middleware/auth');

router.get('/', control.auth, (req, res) => {
    profileControllers.getUser(req, res);
})


module.exports = router;