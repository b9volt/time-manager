//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var Todo = require('../models/todo').model;
var findTodoIndex = require('../public/js/logic.js');


// Adding a new todo
router.post('/add-todo', function(req, res){
  console.log("new todo", req.body);
  User.findOne({
    username: req.user.username
  })
  .then(function(user){
    if(!req.body.done){
      var done = false;
    }
    user.todoList.push({
      description: req.body.description,
      priority: req.body.priority,
      done: req.body.done,
    });
    user.save();
    res.json(user);
    console.log(user);
  })
  .catch(function(err){
    console.log(err);
  });
});

// Edit an existing todo
router.put('/edit/:userid/:id', function(req, res){
  var userId = req.params.userid;
  var todoId = req.params.id;
   User.findOne({
     _id: userId
  }, function(err, user){
    var todoIndex = findTodoIndex(todoId, user.todoList);

    user.todoList[todoIndex].description = req.body.description;
    user.todoList[todoIndex].priority = req.body.priority;
    user.todoList[todoIndex].done = req.body.done;

    user.save(function(err){

      if(err) console.log(err);
      console.log("Edited Todo Saved to User!!!");
      res.json(user);
    });

  });
});

// Deleting a todo
router.delete('/delete/:userid/:id', function(req, res){
 var userId = req.params.userid;
 var todoId = req.params.id;
  User.findOne({
    _id: userId
  }, function(err, user){

    var todoIndex = findTodoIndex(todoId, user.todoList);
    user.todoList.splice(todoIndex, 1);
    user.save(function(err){

      if(err) console.log(err);
      console.log("Todo deleted from User");
      res.json(user);
    });

  });
});

module.exports = router;
