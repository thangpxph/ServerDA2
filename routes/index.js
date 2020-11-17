const express = require("express");
const login = require("../controllers/login.controller");
const signup = require("../controllers/signup.controller");
const router = express.Router();

const Routes = (passport) => {
  router.get("/", login.getLogin);

  router.post("/signin", login.postLogin(passport));

  router.get("/signup", signup.getSignUp);

  router.post("/signup", signup.postSignUp(passport));

  router.get("/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  return router;
};

module.exports = Routes;
