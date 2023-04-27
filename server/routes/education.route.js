const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationService.controller');

router.route('').get(educationController.getEducationService)
router.route('/create').post(educationController.createEducationService)

module.exports = router;
