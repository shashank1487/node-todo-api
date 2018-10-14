const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email."
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        return value.length >= 6;
      },
      message: "Password should be of length 6 or greater"
    }
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt.sign({ _id: user._id.toHexString(), access }, "abc123");
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
    //return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, "abc123");
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //   reject();
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.access": "auth",
    "tokens.token": token
  });
};

let User = mongoose.model("User", UserSchema);

module.exports = {
  User
};
