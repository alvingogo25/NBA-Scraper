var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  author: {
    type: String,
    required: true
  },

  body: {
    type: String,
    require: true
  }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
