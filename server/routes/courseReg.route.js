const express = require('express');
const router = express.Router();
const { registerUserToCourse, getCourseRegistrations } = require('../controllers/courseRegistration.controller');
const { validationMiddleware } = require('../middleware/validation');
const { validatorRegisterToCourse } = require('../validators/register.validator');

router.post('/course', validationMiddleware(validatorRegisterToCourse), registerUserToCourse);
router.get('/list', getCourseRegistrations)

module.exports = router;
