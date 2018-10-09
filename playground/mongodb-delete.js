const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB", err);
    }
    console.log("Successfully connected to MongoDB");
    const db = client.db("TodoApp");

    // db.collection("Todos")
    //   .deleteMany({ test: "Eat dinner" })
    //   .then(result => {
    //     console.log(result);
    //   });

    // db.collection("Todos")
    //   .deleteOne({ text: "Eat dinner" })
    //   .then(result => {
    //     console.log(result);
    //   });

    // db.collection("Todos")
    //   .findOneAndDelete({ completed: false })
    //   .then(result => {
    //     console.log(result);
    //   });

    // db.collection("Users").deleteMany({ name: "Shashank" });

    // db.collection("Users")
    //   .findOneAndDelete({ _id: new ObjectID("5bbb6728200d4c2310b810a1") })
    //   .then(result => console.log(JSON.stringify(result, undefined, 2)));

    client.close();
  }
);
