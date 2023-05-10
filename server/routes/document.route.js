'use strict';
const express = require('express');
const router = express.Router();
const { validationMiddleware } = require('../middleware/validation');
const { getAllDocument, addDocument, getDocumentsByUserId, removeDocument } = require('../controllers/document.controller');
const { validateDocumentCreate } = require('../validators/document.validator');
const fileUpload = require('../middleware/fileUploader');

router.get('/', getAllDocument);
router.post('/', fileUpload('document'), validationMiddleware(validateDocumentCreate), addDocument);
router.delete('/', removeDocument);
router.get('/:id', getDocumentsByUserId);

module.exports = router;