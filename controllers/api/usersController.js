const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let secretOrKey = "subee team";
  if (email && password) {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Không tìm thấy ngươi dùng nào" });
    }
    if (isValidPassword(user, password)) {
      let payload = { _id: user._id };
      let token = jwt.sign(payload, secretOrKey);
      res.json({ msg: "ok", token: token });
    } else {
      res.status(401).json({ msg: "Mật khẩu không đúng" });
    }
  }
};

const getUsers = async (req, res) => {
  console.log(req);
  try {
    let usersData = await User.find().select("-password -__v");
    return res.send(usersData);
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const getUserById = async (req, res) => {
  try {
    let usersData = await User.findById(req.params.id).select("-password -__v");
    return res.status(200).json({ status: true, data: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    let usersData = await User.findOne(req.query).select("-password -__v");
    return res.status(200).json({ status: true, data: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const createAccount = async (req, res) => {
  try {
    let userData = await User.create({
      ...req.body,
      password: createHash(req.body.password),
    });
    return res.status(200).json({ status: true, data: userData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const updateAccount = async (req, res) => {
  try {
    let userData = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        password: createHash(req.body.password),
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ status: true, data: userData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const removeAccount = async (req, res) => {
  try {
    let userData = await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({ status: true, data: userData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
// Tạo mật khẩu mã hoá
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
// So sánh mật khẩu
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createAccount,
  updateAccount,
  removeAccount,
  loginUser,
};
