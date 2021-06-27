const connection = require("./../../db/db");

const addToFavorite = (req, res) => {
  const { userID, postID } = req.body;
  const query = `INSERT INTO users_sports (user_id,sport_id) VALUES (?,?) `;
  const data = [userID, postID];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
  });
  const query_select = `SELECT * FROM users_sports WHERE user_id= ? && sport_id = ?`;
  const data_select = [userID, postID];
  const favorite = await connection.promise().query(query_select, data_select);
  res.status(200).json(favorite[0]);
};

// const getFavorite = (req, res) => {
//   const userId = req.params.id;
//   const query = `SELECT
//   hero.name AS 'hero',
//   power.name AS 'power'
//   FROM
//   hero, power, hero_power
//  WHERE
//   hero.heroID = hero_power.heroID
//  AND
//   power.powerID = hero_power.powerID; `;
// };
// const deleteFavorite = (req, res) => {};

module.exports = {
  addToFavorite,
};
