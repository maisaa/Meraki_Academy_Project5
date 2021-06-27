const express = require('express');

//controllers
const { addComment, getCommentsByPostId, deleteCommentById } = require('../controllers/comment');

//middle-wares
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentRouter = express.Router();

commentRouter.post('/comments', addComment);
commentRouter.get('/comments/:id', getCommentsByPostId);
commentRouter.delete('/comments/:id', deleteCommentById);

module.exports = commentRouter;

