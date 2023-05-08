const express = require('express');
const router = express.Router();
const jobRegController = require('../controllers/jobRegistration.controller');

router.route('').get(jobRegController.getAllJobRegistrations)
router.route('/create').post(jobRegController.createJobRegistration)
router.route('/:id').patch(jobRegController.updateJobRegById)
router.route('/:id').get(jobRegController.getJobRegistrationById)
router.route('/:id').delete(jobRegController.deleteJobRegById)
router.route('/filter').post(jobRegController.getJobRegByFilter)

module.exports = router;
