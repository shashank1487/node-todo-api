const {User} = require('../models/user');

let authenticate = (req, res, next) => {
  console.log('IN Authenticate');
    let token = req.header("x-auth");
    User.findByToken(token)
      .then(user => {
        console.log(user);
        if (!user) {
          return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
      })
      .catch(err => {
        res.status(401).send();
      });
  };

  module.exports = {authenticate};