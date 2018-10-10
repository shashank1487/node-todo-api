const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

let Todo = mongoose.model("Todo", {
  text: { type: String, required: true, minLength: 1, trim: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Number, default: null }
});

// let newTodo = new Todo({
//   text: "cook lunch"
// });

// newTodo.save().then(
//   doc => {
//     console.log("Inserted todo: ", doc);
//   },
//   err => {
//     console.log("unable to insert todo: ", err);
//   }
// );

// let watchUfcTodo = new Todo({
//   text: "watch ufc",
//   completed: true,
//   completedAt: 200
// });

// watchUfcTodo.save().then(
//   doc => {
//     console.log("Inserted todo: ", JSON.stringify(doc, undefined, 2));
//   },
//   err => {
//     console.log("Unable to insert todo", e);
//   }
// );

let User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});

let user = new User({
  email: "shashank.kumar@gmail.com"
});

user.save().then(
  doc => {
    console.log("User saved successfully ", JSON.stringify(doc, undefined, 2));
  },
  err => {
    console.log("Unable to save user ", err);
  }
);
