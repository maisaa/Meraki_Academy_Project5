const db = require("./../../db/db");

const getAllPostByUserId = (req, res) => {
  const command = `SELECT * FROM posts
  WHERE poster_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const addpost = (req, res) => {
  const newPost = {
    post: req.body.post,
    photo: req.body.photo,
    video: req.body.video,
    sport_id: req.body.sport_id,
    poster_id: req.body.poster_id,
  };
  const command = `INSERT INTO posts (post,photo,video,sport_id,poster_id) VALUES (?, ? ,?, ?, ?);`;
  const data = [
    newPost.post,
    newPost.photo,
    newPost.video,
    newPost.sport_id,
    newPost.poster_id,
  ];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(201);
    res.json(result);
  });
};

const getPostById = (req, res) => {
  const command = `
      SELECT * FROM posts 
      WHERE post_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const data = [postId];
  const command = `UPDATE posts SET is_deleted =1 WHERE post_id= ?`;
  db.query(command, data, (err, results) => {
    if (err) return res.status(404);
    res.json("This post is delete successful");
    res.status(202);
  });
};

const updatePost = (req, res) => {
  const postId = req.params.id;
  const { post, photo, video, sport_id, poster_id } = req.body;
  const data = [post, photo, video, sport_id, poster_id, postId];
  const command = `UPDATE posts SET post= ? , photo= ? , video= ? , sport_id= ? , poster_id=? WHERE post_id=?; `;
  db.query(command, data, (err, result) => {
    if (err) return res.status(500);
    res.json(result);
    res.status(201);
  });
};

module.exports = {
  getAllPostByUserId,
  addpost,
  getPostById,
  deletePost,
  updatePost,
};
