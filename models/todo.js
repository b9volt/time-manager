var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  description: String,
  priority: Number,
  done: Boolean,
});


var TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = {
  schema: TodoSchema,
  model: TodoModel
};
