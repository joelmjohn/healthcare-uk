const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogpost.controller');

router.get('', blogController.getAllBlogpost)
router.get('/:id', blogController.getBlogpostById)
router.post('/create', blogController.createBlogpost)
router.patch('/:id', blogController.updateBlogById)
router.delete('/:id', blogController.deleteBlogById)
router.post('/filter', blogController.getAllBlogsByFilter)


module.exports = router;
