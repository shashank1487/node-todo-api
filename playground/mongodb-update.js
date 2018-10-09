const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB", err);
    }
    console.log("Successfully connected to MongoDB");
    const db = client.db("TodoApp");

    db.collection("Todos")
      .findOneAndUpdate(
        { _id: new ObjectID("5bbb7f3e0a98ac2f09ce37bb") },
        { $set: { completed: true } },
        { returnOriginal: false }
      )
      .then(result => console.log(result));

    db.collection("Users")
      .findOneAndUpdate(
        { _id: new ObjectID("5bbb42a956cc971d34c36db6") },
        {
          $set: { name: "Shashank Kumar" },
          $inc: { age: 1 }
        },
        { returnOriginal: false }
      )
      .then(result => console.log(result));

    client.close();
  }
);
