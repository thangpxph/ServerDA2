const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const signUp = (passport) => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        const createAccount = () => {
          // Kiểm tra xem email đã có trong db hay chưa
          User.findOne({ email: email }, (err, user) => {
            // Nếu có lỗi xảy ra thì không tiến hành đăng ký
            if (err) return done(err);
            // Nếu email đã có trong db thì gửi về thông báo cho người dùng
            if (user) {
              return done(
                null,
                false,
                req.flash("message", "Email đã tồn tại!!!")
              );
            } else {
              //Nếu không có email nào thì tiến hành tạo tài khoản mới
              let userInfo = new User();
              userInfo.email = email;
              userInfo.fullname = req.param("fullname");
              userInfo.password = createHash(password); //Tạo mật khẩu dạng mã hoá

              // Cập nhật tải khoản lên mongoDB
              userInfo.save((err) => {
                if (err) {
                  console.log(err.message);
                  throw err;
                }
                //Trả về thông tin sau khi hoàn tất
                return done(null, userInfo);
              });
            }
          });
        };
        process.nextTick(createAccount);
      }
    )
  );

  // Tạo mật khẩu mã hoá
  const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
};
module.exports = signUp;
