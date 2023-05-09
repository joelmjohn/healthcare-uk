'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { validateUniversityCreate, validateFilterUniversity} = require('../validators/university.validator');
const { getAllUniversities, addUniversity, removeUniversity, updateUniversity, getUniversityByCountry } = require('../controllers/university.controller');

router.get('/', getAllUniversities);
router.post('/add', validationMiddleware(validateUniversityCreate), addUniversity);
router.delete('/:id', removeUniversity);
router.patch("/:id", updateUniversity);
router.get("/filter", validationMiddleware(validateFilterUniversity), getUniversityByCountry);

module.exports = router;
