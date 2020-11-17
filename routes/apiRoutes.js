const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/usersController");
const postsController = require("../controllers/api/postsController");

const apiRoutes = (passport) => {
  const jwtAuthenticated = passport.authenticate("jwt", { session: false });

  router.post("/login", userController.loginUser);
  //User API
  router.get("/users", jwtAuthenticated, userController.getUsers);
  router.get("/users/:id", userController.getUserById);
  router.get("/user", userController.getUserByEmail);
  router.post("/user/add", userController.createAccount);
  router.post("/user/update/:id", userController.updateAccount);
  router.delete("/users/:id", userController.removeAccount);

  //Post API
  router.get("/posts", postsController.getPosts);
  router.get("/posts/:id", postsController.getPostByUserId);
  // router.get("/post", postsController.getUserByEmail);
  // router.post("/post/add", postsController.createAccount);
  // router.post("/post/update/:id", postsController.updateAccount);
  return router;
};

module.exports = apiRoutes;
