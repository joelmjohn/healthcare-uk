const express = require('express');
const router = express.Router();
const staffServiceController = require('../controllers/staffService.controller');

router.route('').get(staffServiceController.getStaffService)
router.route('/create').post(staffServiceController.createStaffService)

module.exports = router;
