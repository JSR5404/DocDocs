//const router = require('express').Router();

//const userRoutes = require('./user-routes');

///router.use('/users', userRoutes);

//module.exports = router;
const router = require("express").Router();

const User = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUser) {
      return res.status(404).json({ message: "No access" });
    }

    const isValidPassword = await dbUser.comparePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(404).json({ message: "Wrong password" });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      return res.status(200).json({ message: "Welcome!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Incorrect" });
  }
});

router.post("/signup", async (req, res) => {
  console.log("signup");
  try {
    const dbUser = await User.create(req.body);
    const plainUser = dbUser.get({ plain: true });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(201).json(plainUser);
    });
  } catch (error) {
    res.status(500).json({ message: "Incorrect" });
  }
});

module.exports = router;
