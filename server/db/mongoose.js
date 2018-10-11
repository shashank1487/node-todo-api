let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(
  "//mongodb://shashank:mongo1487@ds021994.mlab.com:21994/user",
  { useNewUrlParser: true }
);

//mongodb://localhost:27017/TodoApp

module.exports = { mongoose };
