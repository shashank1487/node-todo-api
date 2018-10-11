let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://shashank:M8$tek14!$@ds021994.mlab.com:21994/user");

module.exports = { mongoose };