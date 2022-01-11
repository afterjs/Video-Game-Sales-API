var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
let viewPass = bcrypt.hashSync("view", salt);
let editPass = bcrypt.hashSync("edit", salt);
let adminPass = bcrypt.hashSync("admin", salt);

console.log("viewPass", viewPass);
console.log("editPass", editPass);
console.log("adminPass", adminPass);
