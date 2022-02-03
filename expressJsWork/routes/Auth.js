const express = require('express');
const Auth = require('../controllers/Auth')
const router = express.Router();

router.post('/login', Auth.postAuthLogin)
router.get('/login', Auth.getAuthLogin)
module.exports = router;