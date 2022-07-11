var express = require("express");
var router = express.Router();
var shortId = require("shortid");
var model = require("./db.js").model;

/* GET home page. */
router.get("/", async (req, res, next) => {
  await model.find({}, function (err, result) {
    if (err) throw err;
  });
  res.render("index");
});

/* Redirect link with shortId */
router.get("/:name", async function (req, res, next) {
  var currentUrl = req.params.name;

  var check = await model.findOne({
    shortUrl: currentUrl,
  });

  if (!check) {
    next();
  } else {
    res.redirect("http://" + check.longUrl);
  }
});

/* Creating short url's */
router.post("/shortenUrl", async function (req, res, next) {
  var url = await model.findOne({ longUrl: req.body.longUrl }).select("-_id");
  if (req.body.longUrl != "" && !url) {
    var saveData = new model({
      longUrl: req.body.longUrl,
      shortUrl: shortId.generate(),
    });
    await saveData.save();
    res.json({ shortUrl: saveData.shortUrl, longUrl: saveData.longUrl });
    return;
  }
  res.json(url);
});

module.exports = router;
