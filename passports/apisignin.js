const User = require("../models/user");
const passportJwt = require("passport-jwt");

let jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "subee team",
};

const signInApi = (passport) => {
  passport.use(
    new passportJwt.Strategy(jwtOptions, async (jwt_payload, next) => {
      let user = await User.findById(jwt_payload._id);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
  );
};

module.exports = signInApi;
