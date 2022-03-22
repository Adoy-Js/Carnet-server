const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwtServices = require("../services/jwt");

const userController = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.json({ message: "Aucun compte ne correspond à cet email" });
    }

    const userPassword = user.password;

    const compare = await bcrypt.compare(password, userPassword);

    if (compare) {
      const token = jwtServices.generate(user);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
    } else {
      return res.json({ message: "Mot de passe faux" });
    }
  },

  add: async (req, res, next) => {
    const { email, pseudo, password } = req.body;
    try {
      //voir qi personne n'a le meme email
      const userSameEmail = await User.findOne({ where: { email: email } });
      if (userSameEmail) {
        return res.json({ message: "Email deja existant" });
      }

      //voir si quelq'un a le meme pseudo
      const userSamePseudo = await User.findOne({ where: { pseudo: pseudo } });
      if (userSamePseudo) {
        return res.json({ message: "Pseudo deja existant" });
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
