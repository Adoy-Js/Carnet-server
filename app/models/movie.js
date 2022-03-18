const db = require("../db");

class Movie {
  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    }
  }

  static async findAll() {
    try {
      const query = {
        text: `SELECT * from movies`,
      };
      const { rows } = await db.query(query);

      return rows ? rows.map((row) => new this(row)) : false;
    } catch (err) {
      console.error(err);
      if (err.detail) {
        throw new Error(err.detail);
      } else {
        throw err;
      }
    }
  }
}

module.exports = Movie;
