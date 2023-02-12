const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/signup",

  [
    check("name").not().isEmpty(),
    check("password").not().isEmpty(),
    check("type").not().isEmpty(),
  ],
  usersController.signup
);

router.post(
  "/login",
  [check("name").not().isEmpty(), check("password").not().isEmpty()],
  usersController.login
);

module.exports = router;
