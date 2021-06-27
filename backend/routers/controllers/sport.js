const connection = require("./../../db/db");

// the below fun add sport that selected to sport table in DB
const addSport = async (req, res) => {
  const { type, description, photo, video } = req.body;
  const query = `INSERT INTO sports (type,description,photo,video) VALUES (?,?,?,?) `;
  const data = [type, description, photo, video];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
  });
  const query_select = `SELECT * FROM sports WHERE type= ? && description = ?`;
  const data_select = [type, description];
  const SportAdded = await connection.promise().query(query_select, data_select);
  res.status(200).json(SportAdded[0]);
};

// the below fun delete sport that selected from DB (soft delete)
const deleteSport = async (req, res) => {
  const sportID = req.params.id;
  const query = `UPDATE sports SET is_deleted =1 WHERE sport_id= ?`;
  const data = [sportID];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
  });
  const query_select = `select * from sports WHERE sport_id= ?`;
  const data_select = [sportID];
  const SportDeleted = await connection.promise().query(query_select, data_select);
  res.status(202).json(SportDeleted[0]);
};

// the below fun return all sports from sports table
const getAllSports = (req, res) => {
  const query = `SELECT * FROM sports`;
  connection.query(query, (err, results) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(results);
  });
};

module.exports = {
  addSport,
  deleteSport,
  getAllSports,
};
