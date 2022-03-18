const db = require("../db");

class User {
  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    }
  }

 
}

module.exports = User;
