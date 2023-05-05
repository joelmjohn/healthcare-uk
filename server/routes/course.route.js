'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { validateCourseCreate} = require('../validators/course.validator');
const { getAllCourses, addCourse, removeCourse, updateCourse } = require('../controllers/course.controller');

router.get('/', getAllCourses);
router.post('/add', validationMiddleware(validateCourseCreate), addCourse);
router.delete('/:id', removeCourse);
router.patch('/:id', updateCourse);

module.exports = router;
