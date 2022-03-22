const jwt = require("jsonwebtoken");


module.exports = {
    generate: function(userData) {
        return jwt.sign({
          userId: userData.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1h'
        })
      },

}