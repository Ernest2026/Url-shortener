var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var url = require('url');
var model = require('./db.js').model;

/* GET home page. */
router.get('/', async (req, res, next) => {
  var exportData = await model.find({}, function (err, result) {
    if (err) throw err;
  });
  res.render('index', {'data' : exportData, domainName : req.headers.host })
})

/* Redirect link with shortId */
router.get('/:name', async function(req, res, next) {
  var currentUrl = req.params.name;
  
  var check = await model.findOne({
    shortUrl: currentUrl
  });

  if (!check) {
    next();
  } else {
    res.redirect('http://' + check.longUrl);
  }
});

/* Add new div containing the url */
router.post('/formData', async function(req, res, next) {
  var me = await model.findOne({ longUrl: req.body.longUrl })
  if (req.body.longUrl != "" && (!me)) {
    var saveData = new model({
      longUrl: req.body.longUrl
    })
    await saveData.save();
  }

  res.redirect('/');
});


module.exports = router;
