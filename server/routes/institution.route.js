const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institution.controller');

router.route('').get(institutionController.getInstitution)
router.route('/create').post(institutionController.createInstitution)

module.exports = router;
