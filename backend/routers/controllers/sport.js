const connection = require("./../../db/db");

const addSport = async (req, res) => {
  const { type, description, photo, video } = req.body;
  const query = `INSERT INTO sports (type,description,photo,video) VALUES (?,?,?,?) `;
  const data = [type, description, photo, video];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
  });
  const query_select = `select * from sports where type= ? && description = ?`;
  const data_select = [type, description];
  const SportAdded = await connection.promise().query(query_select, data_select);
  res.status(200).json(SportAdded[0]);
};

const deleteSport = (req, res) => {
  const sportID = req.params.id;
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
