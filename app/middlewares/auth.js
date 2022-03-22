const jwt = require("jsonwebtoken");

module.exports = {
  authenticate: (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    });
  },
};
