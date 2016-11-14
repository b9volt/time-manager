//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var Item = require('../models/todo').model;
var findTodoIndex = require('../public/js/logic.js');


//Adding a new todo
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
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    });
    user.save();
    res.json(user);
    console.log(user);
  })
  .catch(function(err){
    console.log(err);
  });
});

// Adding a new favorite item
router.post('/done-todo', function(req, res){
  console.log("new todo", req.body);
  User.findOne({
    username: req.user.username
  })
  .then(function(user){
    user.done.push({
      description: req.body.description,
      priority: req.body.priority,
      done: req.body.done,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    });
    user.save();
    res.json(user);
    console.log(user);
  })
  .catch(function(err){
    console.log(err);
  });
});

//Edit an existing item
router.put('/edit-todo', function(req, res){
  User.findOne({
    username:  req.user.username
  }, function(err, user){
    console.log("CURRENT TODO ID", req.body.currentTodoId);
    //function to find Todo in todoList
    var todoIndex = findTodoIndex(req.body.currentTodoId, user.todoList);
    console.log("THIS IS THE EDITED TODO RESULTS", req.body.editedTodo);
    user.todoList[todoIndex] = req.body.editedTodo;

    user.save(function(err){
      if(err) console.log(err);
      console.log("Edited Todo Saved to User!!!");
    });
    res.json(user);
  });
});

//deleting an item
router.delete('/delete/:id', function(req, res){
  User.findOne({
    username: req.user.username
  }, function(err, user){
    console.log("CURRENT TODO ID", req.params.id);
    var todoIndex = findTodoIndex(req.params.id, user.todoList);
    console.log("TODO INDEX", todoIndex);
    user.todoList.splice(todoIndex, 1);

    user.save(function(err){
      if(err) console.log(err);
      console.log("Todo deleted from User");
    });

    res.json(user);
  });
});

// Removing a favorite item
router.delete('/done-todo/:id', function(req, res){
  User.findOne({
    username: req.user.username
  }, function(err, user){
    console.log("CURRENT DONE ITEM ID", req.params.id);
    var todoIndex = findTodoIndex(req.params.id, user.done);
    console.log("TODO INDEX", todoIndex);
    user.done.splice(todoIndex, 1);

    user.save(function(err){
      if(err) console.log(err);
      console.log("Todo deleted from Done");
    });

    res.json(user);
  });
});

module.exports = router;
