var express = require('express');
var router = express.Router();

var Todo = require('../models/todo.js');

router.get('/', function(req, res){
  var query = Todo.find({});
  query.then(function(todos) {
    console.log(todos)
    res.json({todos: todos})

  })
  .catch( function(err) {
    res.json(500, `ERROR: ${err}`)
  })
});

router.post('/', function(req, res){
  var newToDo;

  Todo.create({
    description: req.body.description,
    done: req.body.done || false,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(function(todo){
    console.log('JUST CREATED TODO OBJECT>>>>', todo)
    newTodo = todo;
  })
  .then(function(){
    return Todo.find({}).exec();
  })
  .then(function(todos) {
    console.log('ALL TODOS>>>>', todos)

    res.json({todos: todos, todo: newTodo});
  })
  .catch(function(err) {
    res.json(400, err)
  })
});

module.exports = router;
