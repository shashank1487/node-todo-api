const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

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
    console.log(token);
    decoded = jwt.verify(token, "abc123");
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //   reject();
    console.log(error);
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.access": "auth",
    "tokens.token": token
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          console.log(res);
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt
      .genSalt(10)
      .then(salt => {
        bcrypt.hash(user.password, salt).then(hash => {
          user.password = hash;
          next();
        });
      })
      .catch(err => {});
  } else {
    next();
  }
});

let User = mongoose.model("User", UserSchema);

module.exports = {
  User
};
