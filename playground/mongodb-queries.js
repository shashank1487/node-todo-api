const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");
// let _id = "6bbdd2a1fb385420cc07c01811";

// if(!ObjectID.isValid(_id)){
//   console.log('Object id is not valid');
//}

// Todo.find({ _id: _id }).then(todos => {
//   console.log("Todos: ", JSON.stringify(todos, undefined, 2));
// });

// Todo.findOne({_id: _id}).then(todo => {
//   console.log("Todo: ", JSON.stringify(todo, undefined, 2));
// });

// Todo.findById(_id).then((todoById) => {
//   console.log('Todo by Id: ', todoById);
// });

let userId = "5bbddc83452ea8c7d5bf6a0011";
User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log("User not found");
    }
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(err => {
    console.log(err);
  });
