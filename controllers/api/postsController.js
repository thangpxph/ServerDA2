const Post = require("../../models/post");
const getPosts = async (req, res) => {
  try {
    let postsData = await Post.find().populate({
      path: "author",
      select: "email fullname",
    });

    return res.status(200).json({ status: true, data: postsData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const getPostByUserId = async (req, res) => {
  try {
    let postsData = await Post.find({ author: req.params.id }).populate({
      path: "author",
      select: "email fullname",
    });
    return res.status(200).json({ status: true, data: postsData });
  } catch (error) {
    return res.status(400).json({ status: true, msg: "Có lỗi xảy ra" });
  }
};

module.exports = {
  getPosts,
  getPostByUserId,
};
