var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var shortId = require('shortid');
var url = require('url');
 
var c = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {'data' : c, url : req.url, domainName : req.headers.host})
})

/* Redirect link with shortId */
router.get('/:name', function(req, res, next) {
  if (c.filter(e => e.shortUrl === req.params.name).length > 0) {
    for (let i = 0; i < 2; i++) {
      if (req.params.name == c[i].shortUrl) {
        res.redirect('http://' + c[i].longUrl);
      }
    }
  } else {
    next();
  }
});

/* Add new div containing the url */
router.post('/formData', function(req, res, next) {
  if (req.body.longUrl != "") {
    var d = {longUrl : req.body.longUrl, shortUrl : shortId.generate()};
    c.push(d);
    res.redirect('/');
  }
      
});


module.exports = router;
