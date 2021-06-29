const db = require("./../../db/db");

const getAllUsers = (req, res) => {
  const command = `SELECT * FROM users`;
  db.query(command, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getProfileById = (req, res) => {
  const command = `
    SELECT * FROM users 
    WHERE user_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};

const updateProfile = (req, res) => {
  const ProfileObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.body.image,
    phone: req.body.phone,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };
  const command = `
    UPDATE users
    SET firstName='?', lastName='?',image='?',phone='?',age='?', email='?', password='?'
    WHERE user_id=?; `;
  const arr = [req.params.id];
  const data = [ProfileObj.firstName, ProfileObj.lastName, ProfileObj.image, ProfileObj.phone, ProfileObj.age, ProfileObj.email, ProfileObj.password];

  db.query(command, arr, data, (err, result) => {
    if (err) return res.status(500);
    res.json(result);
    res.status(200);
  });
};

const deleteProfile = (req, res) => {
  const command = `
    DELETE FROM users
    WHERE user_id= ? AND is_deleted=0;
    `;

  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

module.exports = {
  getAllUsers,
  getProfileById,
  updateProfile,
  deleteProfile,
};
