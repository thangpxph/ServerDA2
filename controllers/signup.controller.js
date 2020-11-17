const getSignUp = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/admin");
  res.render("signup", {
    title: "Đăng ký",
    layout: "main",
    message: req.flash("message"),
  });
};
const postSignUp = (passport) =>
  passport.authenticate("signup", {
    successRedirect: "/admin",
    failureRedirect: "/signup",
    failureFlash: true,
  });
module.exports = {
  getSignUp,
  postSignUp,
};
