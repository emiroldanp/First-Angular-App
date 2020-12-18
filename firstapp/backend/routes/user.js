const express = require("express");
const brypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req ,res, next) => {
  brypt.hash(req.body.password, 10)
  .the(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: "User created",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
  });
});

module.exports = router;
