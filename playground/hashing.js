const { SHA256 } = require("crypto-js");
const JWT = require("jsonwebtoken");

let data = {
  id: 10
};
let token = JWT.sign(data, '123abc');
console.log(token);

let decoded = JWT.verify(token, '123abc');
console.log('Decoded value: ', decoded);
// let message = "I am user number 1";
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
