const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.route('').post(jobController.getJobs)
router.route('/create').post(jobController.createJob)
router.route('/:id').patch(jobController.updateJobById)
router.route('/:id').get(jobController.getJobById)
router.route('/:id').delete(jobController.deleteJobById)
router.route('/filter').post(jobController.getAllJobsByFilter)

module.exports = router;
