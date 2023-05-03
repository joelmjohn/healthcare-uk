const express = require('express');
const router = express.Router();
const countryController = require('../controllers/country.controller');

router.route('').get(countryController.getAllCountry)
router.route('/:id').get(countryController.getCountryById)
router.route('/create').post(countryController.createCountry)
router.route('/:id').patch(countryController.updateCountryById)
router.route('/:id').delete(countryController.deleteCountryById)

module.exports = router;
