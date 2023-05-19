const bcrypt = require('bcrypt');

// Password Hash Middleware
function hashPassword(next) {
    const admin = this;
    if (!admin.isModified('password')) {
        return next();
    }
    bcrypt.hash(admin.password, 10, function(err, hash) {
        if (err) return next(err);
        admin.password = hash;
        next();
    });
}

// Compare password method
function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = {
    hashPassword,
    comparePassword
};
