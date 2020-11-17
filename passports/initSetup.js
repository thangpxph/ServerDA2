const signIn = require("./signin");
const signUp = require("./signup");
const signInApi = require("./apisignin");
const User = require("../models/user");
const initSetup = (passport) => {
  //Thiết lập mặc định cho passport
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  signIn(passport);
  signUp(passport);
  signInApi(passport);
};
module.exports = initSetup;
