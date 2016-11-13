(function(){
  angular.module('todo', []).controller('MainCtrl', function($http)  {
      var self = this;

      $http.get('/todos')
        .then(function(response) {
          self.todos = response.data.todos;
        })
        .catch((err) => {
          console.log(err);
        });

      // APP STATE
      // ==============================
      this.isCreating = false;

      function startCreating() {
        this.isCreating = true;
        this.isEditing = false;
      }

      function reset(todo) {
        this.isCreating = false;
        this.isEditing = false;
      }

      // CRUD LOGIC
      // ==============================

      // ***ADD/CREATE***
      function addTodo(newTodo) {

        $http.post('/todos', newTodo)
          .then(function(response) {
            self.todos = response.data.todos;

            newTodo.description = '';
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // ***DELETE/DESTROY***
      function deleteTodo(id) {
          $http.delete(`/todos/${id}`)
            .then(function(response) {
              console.log(response);
              self.todos = response.data.todos;
            })
        }

      // PUBLIC METHODS
      // ==============================
      this.startCreating = startCreating;
      this.addTodo = addTodo;
      this.reset = reset;
      this.deleteTodo = deleteTodo;
})})();
