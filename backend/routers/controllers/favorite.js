const connection = require("../../db/db");

const addToFavorite = async (req, res) => {
  const { userID, postID } = req.body;
  const query = `INSERT INTO users_posts (user_id,post_id) VALUES (?,?) `;
  const data = [userID, postID];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
  });
  const query_select = `SELECT * FROM users_posts WHERE user_id= ? && post_id = ?`;
  const data_select = [userID, postID];
  const favorite = await connection.promise().query(query_select, data_select);
  res.status(200).json(favorite[0]);
};

const getFavorite = (req, res) => {
  const id = req.params.id;
  const query = `SELECT firstName,post,photo,video FROM users
  INNER JOIN users_posts ON users.user_id = users_posts.user_id AND users_posts.user_id =? 
  INNER JOIN posts ON users_posts.post_id = posts.post_id AND posts.is_deleted=0`;
  const data = [id];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
    res.status(200).json(results);
  });
};

const deleteFavorite = (req, res) => {
  const postID = req.params.postID;
  const query = `UPDATE posts SET is_deleted = 1 WHERE post_id =? `;
  const data = [postID];
  connection.query(query, data, (err, results) => {
    if (err) return res.json(err);
    res.status(202).json("deleted successfully");
  });
};

module.exports = {
  addToFavorite,
  getFavorite,
  deleteFavorite,
};
