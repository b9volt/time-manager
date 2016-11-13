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

      // PUBLIC METHODS
      // ==============================
      this.startCreating = startCreating;
      this.addTodo = addTodo;
      this.reset = reset;
})})();
