const getLogin = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/admin");
  res.render("signin", {
    title: "Đăng nhập",
    layout: "main",
    message: req.flash("message"),
  });
};
const postLogin = (passport) =>
  passport.authenticate("signin", {
    successRedirect: "/admin",
    failureRedirect: "/",
    failureFlash: true,
  });
module.exports = {
  getLogin,
  postLogin,
};
