const connection = require("../../db/db");

const addToFavorite = async (req, res) => {
  const { userID, postID } = req.body;
  console.log("userI2222D", userID);
  console.log("postID2222", postID);

  const query = `INSERT INTO users_posts (user_id,post_id) VALUES (?,?);`;
  const data = [userID, postID];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
    res.json(results);
  });
  // const query_select = `SELECT * FROM users_posts WHERE user_id= ? && post_id = ?`;
  // const data_select = [userID, postID];
  // const favorite = await connection.promise().query(query_select, data_select);
  // res.status(200).json(favorite[0]);
};

const getFavorite = (req, res) => {
  const id = req.params.id;
  const query = `SELECT firstName,post,photo,video,poster_id,posts.post_id FROM users
  INNER JOIN users_posts ON users.user_id = users_posts.user_id AND  users_posts.user_id =? 
  INNER JOIN posts ON users_posts.post_id = posts.post_id AND users_posts.is_deleted=0`;
  const data = [id];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
    res.status(200).json(results);
  });
};

const deleteFavorite = (req, res) => {
  const { postId, userId } = req.body;
  console.log("postId", postId);
  console.log("userId", userId);

  const query = `UPDATE users_posts SET is_deleted = 1 WHERE post_id =? AND user_id =?;`;
  const data = [postId, userId];
  connection.query(query, data, (err, results) => {
    if (err) return res.json(err);
    // res.status(202).json("deleted successfully");
  });
};

module.exports = {
  addToFavorite,
  getFavorite,
  deleteFavorite,
};
