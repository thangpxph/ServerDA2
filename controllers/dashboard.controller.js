const User = require("../models/user");
const Post = require("../models/post");

const getDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Trang quản trị",
    layout: "dashlayout",
    user: req.user.toJSON(),
  });
};
const getUserMananger = async (req, res) => {
  // Lấy thông tin người dùng từ mongodb.
  let users = await User.find()
    .select("-password") // Trả về tất cả thông tin trừ password sẽ không lấy
    .lean();
  let newData = users.map((item, index) => ({
    ...item,
    noNum: index + 1,
  }));
  res.render("users", {
    title: "Quản lý người dùng",
    layout: "dashlayout",
    userList: newData,
  });
};
const getPosts = async (req, res) => {
  // Lấy thông tin bài đăng theo người dùng từ mongodb.

  let users = await User.find().lean();
  let posts = await Post.find({ author: req.user._id })
    .populate({ path: "author", select: "email fullname" })
    .lean();

  let newData = posts.map((item, index) => ({
    ...item,
    noNum: index + 1,
  }));
  res.render("posts", {
    title: "Quản lý bài đăng",
    layout: "dashlayout",
    postList: newData,
    users: users,
  });
};
const createPost = async (req, res) => {
  const { postId, title, description, author } = req.body;
  try {
    if (postId !== "") {
      let updateData = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          description,
          author,
        },
        { new: true }
      );
    } else {
      let createData = await Post.create({ title, description, author });
    }
    res.redirect("/admin/posts");
  } catch (error) {
    console.log(error.message);
  }
};
const getPostByUserId = async (req, res) => {
  try {
    let postData = await Post.find({ author: req.params.id }).lean();
    return res.render("posts", {
      title: "Quản lý bài đăng",
      layout: "dashlayout",
      postList: postData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getDashboard,
  getUserMananger,
  getPosts,
  createPost,
  getPostByUserId,
};
