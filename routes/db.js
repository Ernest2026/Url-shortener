var mongoose = require('mongoose');
var shortId = require('shortid');
var schema = mongoose.Schema;

var schemaName = new schema({
    longUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true,
      default: shortId.generate()
    }
  }, {
    versionKey: false
  }, {
    collection: 'urldb'
  });

  var model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/urldb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = {
    model: model
}