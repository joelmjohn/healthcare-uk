const express = require('express');
const router = express.Router();
const jobRoleController = require('../controllers/jobRole.controller');

router.route('').get(jobRoleController.getJobRoles)
router.route('/create').post(jobRoleController.createJobRole)

module.exports = router;
