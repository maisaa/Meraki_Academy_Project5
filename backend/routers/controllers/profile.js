const db = require("./../../db/db");

const getAllUsers = (req, res) => {
  const { roleId, type } = req.query;
  const command = `SELECT * FROM users
  INNER JOIN sports ON  users.role_id =? AND sports.type=? AND sports.is_deleted = 0 AND users.is_deleted =0;`;
  const data = [roleId, type];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getAllUsers1 = (req, res) => {
  const { roleId, type } = req.query;
  let typeByID;
  const command_type = `SELECT * FROM sports where sports.type = ?  `;
  const data_type = [type];
  db.query(command_type, data_type, (err, result) => {
    if (err) return res.status(404);
    typeByID = result[0].sport_id;
    const command = `SELECT * FROM users 
    where  role_id =? AND sport_id=? AND is_deleted =0;`;
    const data = [roleId, typeByID];
    db.query(command, data, (err, result) => {
      if (err) return res.status(404);
      res.status(200);
      res.json(result);
    });
  });
};

const getAllUsersPost = (req, res) => {
  const command = `SELECT users.image, users_posts.user_id , users_posts.post_id 
  , posts.poster_id , users.firstName ,users.lastName From users_posts
  INNER JOIN posts ON users_posts.post_id = posts.post_id AND users_posts.is_deleted =0
  INNER JOIN users ON users.user_id = users_posts.user_id`;

  db.query(command, (err, result) => {
    if (err) return res.status(404);
    console.log("result", result);
    res.status(200);
    res.json(result);
  });
};

const getAllChats = (req, res) => {
  const command = `SELECT *  FROM users_chats WHERE user_id =?;`;
  data = [req.body.userId];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getAllUsersPost1 = (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const command = `SELECT users_posts.user_id , posts.post, users_posts.post_id 
  , posts.poster_id , users.firstName From users_posts
  INNER JOIN posts ON users_posts.post_id = posts.post_id AND users_posts.is_deleted =0
  INNER JOIN users ON users.user_id = ? AND users.user_id = users_posts.user_id`;
  const data = [id];
  db.query(command, data, (err, result) => {
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

const getProfileFirstName = (req, res) => {
  const command = `
    SELECT * FROM users  
    WHERE firstName= ? AND is_deleted=0;`;
  const data = [req.body.firstName];
  console.log("req.body.firstName", req.body.firstName);
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};

const getProfileById1 = (req, res) => {
  const command = `
    SELECT * FROM users 
    INNER JOIN sports ON users.user_id= ? AND users.is_deleted=0 AND users.sport_id = sports.sport_id;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};
const updateProfile = (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, image, phone, age } = req.body;
  const data = [firstName, lastName, image, phone, age, userId];
  const command = `UPDATE users SET firstName= ? , lastName= ? , image= ? , phone= ?, age= ?  WHERE user_id=?; `;
  db.query(command, data, (err, result) => {
    if (err) return res.status(500);
    res.json(result);
    res.status(201);
  });
};

const deleteProfile = (req, res) => {
  const userId = req.params.id;
  const data = [userId];
  const command = `UPDATE users SET is_deleted =1 WHERE user_id= ?`;
  db.query(command, data, (err, results) => {
    if (err) return res.status(500);
    res.json("This user is delete successful");
    res.status(201);
  });
};

const deleteProfile1 = (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const data = [userId, postId];
  const command = `UPDATE users_posts SET is_deleted =1 WHERE user_id= ? AND post_id =?;`;
  db.query(command, data, (err, results) => {
    if (err) return res.status(500);
    res.json("This user is delete successful");
    res.status(201);
  });
};

const deleteFromUserPosts = (req, res) => {
  const { userId, postId } = req.body;
  const command = `UPDATE users_posts SET is_deleted =1 where user_id =? AND post_id = ?`;
  data = [userId, postId];
  db.query(command, data, (err, result) => {
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
  getAllUsersPost,
  deleteFromUserPosts,
  getProfileById1,
  getAllUsersPost1,
  getAllUsers1,
  getProfileFirstName,
  getAllChats,
  deleteProfile1,
};
