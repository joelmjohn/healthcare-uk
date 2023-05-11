'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { validateLogin } = require('../validators/authentication.validator');
const { login } = require('../controllers/authentication.controller');

router.post('/admin', validationMiddleware(validateLogin), login);

module.exports = router;
