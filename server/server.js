const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

let Todo = mongoose.model("Todo", {
  text: { type: String },
  completed: { type: Boolean },
  completedAt: { type: Number }
});

let newTodo = new Todo({
  text: "cook dinner"
});

// newTodo.save().then(
//   doc => {
//     console.log("Inserted todo: ", doc);
//   },
//   err => {
//     console.log("unable to insert todo");
//   }
// );

let watchUfcTodo = new Todo({
  text: "watch ufc",
  completed: true,
  completedAt: 200
});

watchUfcTodo.save().then(
  doc => {
    console.log("Inserted todo: ", JSON.stringify(doc, undefined, 2));
  },
  err => {
    console.log("Unable to insert todo", e);
  }
);
