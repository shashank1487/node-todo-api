// const mongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB", err);
    }
    console.log("Successfully connected to MongoDB");
    const db = client.db("TodoApp");
    // db.collection("Todos").insertOne(
    //   {
    //     text: "Something to do",
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert todo");
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );
    // db.collection("Users").insertOne(
    //   {
    //     name: "shashank",
    //     age: 31,
    //     location: "hyderabad"
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //   }
    // );
    client.close();
  }
);
