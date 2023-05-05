const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const documentRoute = require('./document.route');
const countryRoute = require('./country.route');
const adminRoute = require('./admin.route');
const jobRoute = require('./job.route');
const universityRoute = require('./university.route');
const courseRoute = require('./course.route');
const jobRegRoute = require('./jobReg.route');

router.use('/user', userRoute);
router.use('/document', documentRoute);
router.use('/country', countryRoute);
router.use('/admin', adminRoute);
router.use('/job', jobRoute);
router.use('/university', universityRoute);
router.use('/course', courseRoute);
router.use('/jobReg', jobRegRoute);

module.exports = router;