const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisation.controller');

router.route('').get(organisationController.getOrganisation)
router.route('/create').post(organisationController.createOrganisation)

module.exports = router;
