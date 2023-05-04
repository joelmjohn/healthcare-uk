'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
// const { validateCourseCreate} = require('../validators/course.validator');
const { getAllUniversities, addUniversity, removeUniversity, updateUniversity } = require('../controllers/university.controller');

router.get('/', getAllUniversities);
router.post('/add', addUniversity);
router.delete('/:id', removeUniversity);
router.patch("/:id", updateUniversity)

module.exports = router;
