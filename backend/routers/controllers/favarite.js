const connection = require("./../../db/db");

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
  const userId = req.params.id;
  const query = `SELECT posts.post AS 'post',users.firstName AS 'name' FROM users, posts, users_posts WHERE users_posts.user_id = ? AND posts.post_id = users_posts.post_id`;
  connection.query(query, data, (err, results) => {
    console.log(results);
  });
};

const deleteFavorite = (req, res) => {};

module.exports = {
  addToFavorite,
  getFavorite,
};
