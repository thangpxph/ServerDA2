const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const signIn = (passport) => {
  passport.use(
    "signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        // Tìm dữ liệu theo email trong mongo
        User.findOne({ email: email }, (err, user) => {
          // Nếu có lỗi thì bỏ qua không đăng nhập
          if (err) return done(err);
          // Nếu người dùng không tồn tại thì bỏ qua không đăng nhập và trả về thông tin
          if (!user) {
            return done(
              null,
              false,
              req.flash("message", "Không có tài khoản này!!!")
            );
          }
          // Trả về thông báo nếu kiểm tra sai mật khẩu người dùng
          console.log(user);

          if (!isValidPassword(user, password)) {
            return done(
              null,
              false,
              req.flash(
                "message",
                "Tài khoản hoặc mật khẩu đăng nhập không chính xác."
              )
            );
          }
          // Callback trả về kết quả kiểm tra
          return done(null, user);
        });
      }
    )
  );

  //Kiểm tra mật khẩu mã hoá có trùng nhau hay ko
  const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
  };
};
module.exports = signIn;
