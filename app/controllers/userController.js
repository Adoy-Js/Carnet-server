const bcrypt = require("bcrypt");
const jwtServices = require("../services/jwt");

const { User } = require("../../models");

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
      return res.status(200).json({
        user: user,
      });
    } else {
      return res.json({ message: "Mot de passe faux" });
    }
  },

  auth: (req, res, next) => {
    const userId = Number(req.headers.userid);
    const token = jwtServices.generate(userId);
    return res
      .cookie("token", token)
      .cookie("userId", userId)
      .json({ user: req.headers.user });
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

      return res.json({ user: newUser, message: "user ajouté" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  },

  searchUser: async (req, res, next) => {
    const { user } = req.body;

    try {
      const userWanted = await User.findOne({ where: { pseudo: user } });

      const usertoReturn = {
        user: userWanted.pseudo,
      };

      return res.json(usertoReturn);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  },
};

module.exports = userController;
