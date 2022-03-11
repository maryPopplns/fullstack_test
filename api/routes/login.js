var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/google', function (req, res, next) {
  res.send('login');
});

router.get('/google/success', function (req, res, next) {
  res.send('login');
});

module.exports = router;
