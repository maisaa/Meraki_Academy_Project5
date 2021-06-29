const db = require("./../../db/db");

const getImage = (req, res) => {
  const command = `SELECT * FROM images`;
  db.query(command, (err, result) => {
    if (err) return res.status(204);
    res.status(204);
    res.json(result);
  });
};

const addImage = (req, res) => {
  const imageObj = {
    image: req.body.image,
  };
  const command = `INSERT INTO images (image)
    VALUES (?);`;
  const data = [imageObj.image];
  db.query(command, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const deleteImage = (req, res) => {
  const command = `
    DELETE FROM images
    WHERE image_id= ? AND is_deleted=0;
    `;

  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

module.exports = {
  getImage,
  addImage,
  deleteImage,
};
