const multer = require('multer');
const { errorResponse } = require('../utils/responseUtils');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // uploads folder where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // filename format with timestamp and original name
    }
  })

const fileUpload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB file size limit
      files: 5 // maximum of 5 files allowed
    }
  }).array('document');


module.exports = () => (req, res, next) => {
    fileUpload(req, res, (err) => {
        if (err) {
            console.log('Error is', err);
            return errorResponse(res, err.message);
        } else {
            return next();
        }
    });
};