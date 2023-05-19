const adminModel = require('../models/document.model');
const passport = require('passport');

exports.save = async (data) => {
    const doc = new adminModel(data);
    return await doc.save();
};

exports.login = async ({email, password}) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('basic', { session: false }, (err, user, info) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject(new Error('Authentication failed'));
          }
          resolve(user);
        })({ body: { email, password } });
    });
}
