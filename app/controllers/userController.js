const User = require("../models/user");

const userController = {
  login: () => {},

  add: async (req, res, next) => {
    const { email, pseudo, password } = req.body;
    
  },
};

module.exports = userController;
