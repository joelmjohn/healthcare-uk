const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const documentRoute = require('./document.route');
const countryRoute = require('./country.route');

router.use('/user', userRoute);
router.use('/document', documentRoute);
router.use('/country', countryRoute)


module.exports = router;