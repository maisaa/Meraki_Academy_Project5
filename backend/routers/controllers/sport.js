const connection = require("./../../db/db");

const addSport = (req, res) => {
  const { type, description, photo, video } = req.body;
  const query = `INSERT INTO sports (type,description,photo,video) VALUES (?,?,?,?)`;
  const data = [type, description, photo, video];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(results);
  });
};

module.exports = {
  addSport,
};
