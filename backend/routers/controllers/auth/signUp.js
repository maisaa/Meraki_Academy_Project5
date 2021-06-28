const connection = require("./../../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

const createNewUser = async (req, res) => {
  const { firstName, lastName, phone, age, email, password, role_id, sport_id } = req.body;
  // hash Pass && convert email to lowercase
  console.log("sport_id", sport_id);
  const hashPassword = await bcrypt.hash(password, 10);
  const emailAfterLowercase = email.toLowerCase();
  // insert user to DB
  const query_insert = `INSERT INTO users (firstName,lastName,phone,age,email,password,role_id) VALUES (?,?,?,?,?,?,?)`;
  const data_insert = [firstName, lastName, phone, age, emailAfterLowercase, hashPassword, role_id];
  await connection.promise().query(query_insert, data_insert);
  //find user which added
  const query_select = `SELECT * FROM users WHERE email= ? && password = ?`;
  const data_select = [emailAfterLowercase, hashPassword];
  const userAdded = await connection.promise().query(query_select, data_select);
  res.status(201).json(userAdded[0]);
};

module.exports = {
  createNewUser,
};
