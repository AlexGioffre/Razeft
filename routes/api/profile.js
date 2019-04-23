const express = require('express');
const router = express.Router();
const profileControllers = require('../../controllers/profile');
const auth = require('../../middleware/auth');
router.get('/', auth, (req, res) => {
    profileControllers.getUser(req, res);
})

module.exports = router;