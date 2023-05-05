const express = require('express');
const router = express.Router();
const { registerUserToCourse } = require('../controllers/registration.controller');
const { validationMiddleware } = require('../middleware/validation');
const { validatorRegisterToCourse } = require('../validators/register.validator');

router.post('/course', validationMiddleware(validatorRegisterToCourse), registerUserToCourse);


module.exports = router;
