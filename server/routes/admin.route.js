const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.route('').get(adminController.getAllAdmin)
router.route('/:id').get(adminController.getAdminById)
router.route('/create').post(adminController.createAdmin)
router.route('/:id').patch(adminController.updateAdminById)
router.route('/:id').delete(adminController.deleteAdminById)
router.route('/filter').post(adminController.getAdminByFilter)
router.route('/login').post(adminController.loginAdmin)


module.exports = router;
