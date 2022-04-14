require("dotenv").config();

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  //console.log(process.env.JWT_SECRET_KEY);
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    //we will try to find the user with the email provided
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    //if the user is found then it is error
    if (user)
      return res.status(400).send({ message: "Please try another email" });

    //if user is not found then we will create the user with the email and the password provided
    user = await User.create(req.body);

    //then we will hash the password to the password more secure

    //then we will create the token
    const token = newToken(user);

    //then return token and user

    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({ message: "Please try another password" });

    const match = user.checkPassword(req.body.password);

    if (!match)
      return res.status(400).send({ message: "Please try another email" });

    const token = newToken(user);

    //then return token and user

    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = { register, login };
