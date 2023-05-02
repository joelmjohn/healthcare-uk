const multer = require('multer');
const { errorResponse } = require('../utils/responseUtils');

const fileUpload = multer({ dest: 'uploads/' }).single('file');


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
