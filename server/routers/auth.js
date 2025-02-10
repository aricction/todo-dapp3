const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const {auth , login} = require('../controllers/auth');

//router.post('/', auth);

router.post('/login', login);

router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ msg: 'You have access to this route', user: req.user });
});

module.exports = router;

