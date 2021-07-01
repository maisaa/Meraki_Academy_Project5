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
postRouter.post("/posts", addpost);
postRouter.get("/posts/:id", getPostById);
postRouter.put("/posts/:id",  updatePost);
postRouter.put("/post/:id", deletePost);
module.exports = postRouter;

// authentication, authorization("1"),
