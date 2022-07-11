var mongoose = require("mongoose");
var schema = mongoose.Schema;

var schemaName = new schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
  {
    collection: "urldb",
  }
);

var model = mongoose.model("Model", schemaName);

module.exports = { model };
