(function(){
  var app = angular.module('time-manager', ['ui.router']);

  app.controller('MainCtrl', function($http, $state, $stateParams){
    var self = this;

    self.currentTodo = $stateParams.todo;
    self.done = [];
    self.imageURL = "NO URL"

    $http.get('/helper/get-user')
      .then(function(response){
        console.log("HELPER RESPONSE >>>>", response.data.user);
        self.user = response.data.user;
        self.todos = response.data.user.todoList;
        self.done = response.data.user.done;
        console.log("current user status", self.user);
      })
      .catch(function(err){
        console.log(err);
      });

    function addTodo(newTodo){
      //call add done function if done was selected
      console.log("new todo", newTodo);
      $http.post('/user/add-todo', newTodo)
        .then(function(response){
          console.log("TODO HAS BEEN ADDED TO USER >>>>>>>", response.data.todoList);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteTodo(id){
      console.log("CURRENT TODO TO DELETE >>>>>>>", id);
      $http.delete('/user/delete/' + self.user._id + '/' + id)
        .then(function(response){
          console.log("TODO HAS BEEN DELETED FROM USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editTodo(todo){
      console.log("CURRENT TODO TO EDIT >>>>>>>", todo._id);
      $http.put('/user/edit/' + self.user._id + '/' + todo._id, todo)
        .then(function(response){
          console.log( "TODO HAS BEEN EDITED BY USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.addTodo = addTodo;
    this.deleteTodo = deleteTodo;
    this.editTodo = editTodo;

  });

  app.controller('AuthCtrl', function($scope, $http, $state, $stateParams){
    var self = this;

    self.isLoggedIn = false;

    function login(userPass){
      $http.post('/login', {username: userPass.username, password: userPass.password})
        .then(function(response){
          console.log(response);
          self.isLoggedIn = true;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function register(userPass){
      $http.post('/register', {username: userPass.username, password: userPass.password})
        .then(function(response) {
          console.log(response);
          self.isLoggedIn = true;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function logout(){
      console.log("LOGOUT CLICKED!!!!");
      $http.delete('/logout')
        .then(function(response){
          console.log(response);
          self.isLoggedIn = false;
          $state.go('home', {url: '/'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.login = login;
    this.register = register;
    this.logout = logout;
  });

})();
