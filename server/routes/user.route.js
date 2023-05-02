const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('').get(userController.getUsers)
router.route('/create').post(userController.createUser)
router.route('/:id').patch(userController.updateUserById)
router.route('/:id').get(userController.getUserById)
router.route('/:id').delete(userController.deleteUserById)

module.exports = router;
