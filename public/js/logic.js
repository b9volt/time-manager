
//function finds the index of an item in the grocerylist and returns it
var findTodoIndex = function(id, todo){
  console.log("TODO ID", id);
  for(var i = 0; i < list.length; i++){
    if(todo[i]._id == id){
      var index = i;
    }
  }
  console.log("TODO INDEX IN LOGIC:", index);
  return index;
};


module.exports = findTodoIndex;
