'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { getAllDocument, createDocument } = require('../controllers/document.controller');
const { validateDocumentCreate } = require('../validators/document.validator');
const fileUpload = require('../middleware/fileUploader');

router.get('/', getAllDocument);
router.post('/', fileUpload('document'), validationMiddleware(validateDocumentCreate), createDocument);


module.exports = router;
