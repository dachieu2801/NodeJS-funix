const mongoose = require("mongoose");

function connect() {
  mongoose.connect("mongodb://localhost/todo", (err, db) => {
    if (err) {
      console.log("----------------Error------------------");
    } else {
      console.log("----------------Connected--------------");
    }
  });
} 
module.exports = connect;
