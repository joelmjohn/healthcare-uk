const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { validateCreateAdmin, validateUpdate, validateDelete } = require('../validators/admin.validator');
const {
    getAllAdmin,
    getAdminById,
    createAdmin,
    updateAdminById,
    deleteAdminById,
    getAdminByFilter,
    loginAdmin
} = require('../controllers/admin.controller');


router.get('', getAllAdmin);
router.get('/:id', getAdminById);
router.post('/create', validationMiddleware(validateCreateAdmin), createAdmin);
router.patch('/:id', validationMiddleware(validateUpdate), updateAdminById);
router.delete('/:id', validationMiddleware(validateDelete), deleteAdminById);
router.post('/filter', getAdminByFilter);
router.post('/login', loginAdmin);


module.exports = router;
