require("./config/config");
let _ = require("lodash");
let { ObjectID } = require("mongodb");
let express = require("express");
let bodyParser = require("body-parser");
let bcrypt = require("bcryptjs");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");
let { authenticate } = require("./middleware/authenticate");

let app = express();
let port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find({}).then(
    todos => {
      res.send({ todos });
    },
    err => res.status(400).send(err)
  );
});

app.get("/todos/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete("todos/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send(todo);
    })
    .catch(err => res.status(400).send());
});

app.patch("/todos/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  let body = _.pick(req.body, ["text", "completed"]);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => res.status(400).send());
});

app.post("/users", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  let user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(err => res.status(400).send());
});

//Private route
app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
