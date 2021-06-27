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
  const id = req.params.id;
  const query = `select firstName,post,photo,video from users inner join users_posts ON users.user_id = users_posts.user_id AND users_posts.user_id =? inner join posts on users_posts.post_id = posts.post_id`;
  const data = [id];
  connection.query(query, data, (err, results) => {
    if (err) return res.json(err);
    res.json(results);
  });
};

const deleteFavorite = (req, res) => {};

module.exports = {
  addToFavorite,
  getFavorite,
};
