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
mongoose.connect('mongodb+srv://urlshortener:urlshortener@cluster0.zlpdd.mongodb.net/urldb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = {
    model: model
}
