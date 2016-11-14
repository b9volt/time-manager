var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var TodoSchema = require('./todo.js').schema;


var UserSchema = new Schema({
  username: String,
  password: String,
  todoList: [TodoSchema],
  done: [TodoSchema]
});

UserSchema.plugin(passportLocalMongoose);
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
