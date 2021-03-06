require('dotenv').config();
const path = require('path');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require(path.join(__dirname, '../models/user'));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT,
      clientSecret: process.env.SECRET,
      callbackURL:
        'https://pure-waters-33367.herokuapp.com/login/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      const { email } = profile._json;

      const query = { username: email };
      const update = { username: email };
      const options = { upsert: true, new: true };
      // Find the document
      User.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) {
          done(error);
        } else {
          done(null, result);
        }
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    function (jwtPayload, done) {
      const id = jwtPayload.data._id;
      User.findById(id)
        .then((user) => {
          if (!user) {
            done(null, false, 'no user');
          } else {
            done(null, user);
          }
        })
        .catch((error) => done(error));
    }
  )
);
