var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  subhead: {
    type: String,
    required: true,
  },

  saved: {
    type: Boolean,
    default: false,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
