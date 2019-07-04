var mongooes = require ("mongoose");
var Schema = mongoose.Schema;
var noteSchema = new Schema({
  //associated article that i want to attached to the note
  _headlineID:{
    type: Schema.Types.ObjectId,
    ref:"Headline"
  },
  date: String,
  noteText: String
  
})

var Note = mongoose.model("Note", noteSchema);
module.exports = Note;


