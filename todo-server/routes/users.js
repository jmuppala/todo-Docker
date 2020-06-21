const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>This is the /users route</h1>');
});

module.exports = router;
