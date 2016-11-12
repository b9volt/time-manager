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
})})();
