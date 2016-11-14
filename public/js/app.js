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
        self.items = response.data.user.todoList;
        self.done = response.data.user.done;
        console.log("current user status", self.user);
      })
      .catch(function(err){
        console.log(err);
      });

    function addTodo(newTodo){
      //call add favorite function it favorite was selected
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

    function addDone(item){
      console.log("new done", todo);
      $http.post('/user/done-todo', todo)
        .then(function(response){
          console.log("TODO HAS BEEN CHECKED DONE BY USER >>>>>>>", response.data.todoList);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteTodo(){
      console.log("CURRENT TODO TO DELETE >>>>>>>", self.currentTodo);
      console.log("_id: ", self.currentTodo._id);
      $http.delete(`/user/delete/${self.currentTodo._id}`)
        .then(function(response){
          console.log("TODO HAS BEEN DELETED FROM USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function notDone(){
      console.log("CURRENT ITEM TO TODO >>>>>>>", self.currentTodo);
      console.log("_id: ", self.currentTodo._id);
      $http.delete(`/user/notDone-todo/${self.currentTodo._id}`)
        .then(function(response){
          console.log("TODO IS NOT DONE BY USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editItem(todo){
      console.log("CURRENT TODO TO EDIT >>>>>>>", self.currentTodo);
      console.log("EDITED TODO RESULTS >>>>>>>", todo);
      console.log("_id: ", self.currentTodo._id);
      $http.put('/user/edit-todo', {
          currentTodoId: self.currentTodo._id,
          editedTodo: todo
        })
        .then(function(response){
          console.log(response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.addTodo = addTodo;
    this.deleteTodo = deleteTodo;
    this.editTodo = editTodo;
    this.addDone = addDone;
    this.notDone = notDone;
    // this.getImage = getImage;

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
