const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const adminModel = require('../models/admin.model');

passport.use('basic', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  (req, email, password, done) => {
    adminModel.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { msg: 'User not found.' })
        }
        user.comparePassword(password, (err, data) => {
          if (err) {
            return done(null, false, { msg: 'Something went wrong.' })
          }
          if (!data && ( req.body.email !== '' )) {
            return done(null, false, { msg: 'Password or username is correct.' })
          }
          return done(null, user)
        })
      })
      .catch((err) => done(err));
  }
));