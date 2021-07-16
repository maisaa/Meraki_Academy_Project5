const db = require("./../../db/db");

//Add new comment on a post by an user
const addComment = (req, res) => {
  const { comment, post_id, commenter_id } = req.body;
  const command = `INSERT INTO comments (comment, post_id, commenter_id) VALUES (?,?,?);`;
  const data = [comment, post_id, commenter_id];

  db.query(command, data, (err, result) => {
    if (err) return res.status(404).json(err);

    res.status(200).json(result);
  });
};

//Get all comments for one post
const getCommentsByPostId = (req, res) => {
  const postId = req.params.id;
  const command = `SELECT users.firstName, comments.comment FROM comments 
  INNER JOIN users ON comments.commenter_id = user_id 
  INNER JOIN posts ON comments.post_id = posts.post_id AND posts.post_id = ?   ;`;
  const data = [postId];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404).json(err);

    res.status(200).json(result);
  });
};
//delete comment by commenter_id
const deleteCommentById = (req, res) => {
  const userId = req.params.id;
  const command = `UPDATE comments SET is_deleted = 1 WHERE commenter_id = ?;`;
  const data = [userId];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404).json(err);

    res.status(201).json("comment deleted successfully");
  });
};

module.exports = {
  addComment,
  getCommentsByPostId,
  deleteCommentById,
};
