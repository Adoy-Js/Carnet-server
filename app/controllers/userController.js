const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = {
  login: () => {},

  add: async (req, res, next) => {
    const { email, pseudo, password } = req.body;
    try {
      //voir qi personne n'a le meme email
      const userSameEmail = await User.findOne({ where: { email: email } });
      if (userSameEmail) {
        res.json({ message: "Email deja existant" });
      }

      //voir si quelq'un a le meme pseudo
      const userSamePseudo = await User.findOne({ where: { pseudo: pseudo } });
      if (userSamePseudo) {
        res.json({ message: "Pseudo deja existant" });
      }

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);

      const newUser = await User.create({ email, pseudo, password: hash });

      return res.json({ user: { email, pseudo }, message: "user ajouté" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
