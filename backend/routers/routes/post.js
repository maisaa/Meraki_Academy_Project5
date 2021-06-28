const express = require("express");
const {
  getAllPostByUserId,
  addpost,
  getPostById,
  deletePost,
  updatePost,
} = require("./../controllers/post");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const postRouter = express.Router();

postRouter.get("/posts/all/:id", getAllPostByUserId);
postRouter.post("/posts", authentication, authorization("1"), addpost);
postRouter.get("/posts/:id", getPostById);
postRouter.put("/posts/:id", authentication, authorization("1"), updatePost);
postRouter.delete("/posts/:id", authentication, authorization("1"), deletePost);
module.exports = postRouter;
