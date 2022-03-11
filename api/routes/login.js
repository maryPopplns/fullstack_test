const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const time = {
  hour: Math.floor(Date.now() / 1000) + 60 * 60,
  day: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
};

/* GET home page. */
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', function (req, res, next) {
  passport.authenticate(
    'google',
    { session: false },
    function (error, user, info) {
      // error
      if (error) {
        next(error);
      }
      if (!user) {
        return res.status(400).json({
          message: info.message,
        });
      }
      const token = jwt.sign(
        {
          data: user.toJSON(),
          exp: time.day,
        },
        'secret'
      );
      // send token / redirect to home
      res.cookie('knightBlogToken', token);
      res.redirect('https://pure-waters-33367.herokuapp.com');
    }
  )(req, res, next);
});

module.exports = router;
