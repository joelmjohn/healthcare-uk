'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { validateUniversityCreate} = require('../validators/university.validator');
const { getAllUniversities, addUniversity, removeUniversity, updateUniversity } = require('../controllers/university.controller');

router.get('/', getAllUniversities);
router.post('/add', validationMiddleware(validateUniversityCreate), addUniversity);
router.delete('/:id', removeUniversity);
router.patch("/:id", updateUniversity)

module.exports = router;
