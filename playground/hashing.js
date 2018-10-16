const { SHA256 } = require("crypto-js");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let password = "Pass@123";
let hashedPassword = "";

bcrypt
  .genSalt(10)
  .then(salt => {
    bcrypt.hash(password, salt).then(hash => {
      hashedPassword = hash;
      console.log(hash);
    });
  })
  .catch(err => {
    console.log(err);
  });

bcrypt
  .compare(password, '$2a$10$k6VHQsKF1g2K182rV4zoAuGhX5I52bqreeYCvu43.Gyl.UAgZZ5VW')
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
// let data = {
//   id: 10
// };
// let token = JWT.sign(data, '123abc');
// console.log(token);

// let decoded = JWT.verify(token, '123abc');
// console.log('Decoded value: ', decoded);
// // let message = "I am user number 1";
// let hash = SHA256(message);

// console.log("Original message: ", message);
// console.log("Hashed message: ", hash.toString());

// let data = {
//   id: 4
// };

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "some string").toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'some string').toString();

// if (resultHash === token.hash) {
//   console.log("Data was not contaminated");
// } else {
//   console.log("Data was contaminated. Don't trust");
// }
