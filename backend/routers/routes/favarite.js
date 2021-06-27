const express = require("express");

//controllers

const { addToFavorite } = require("../controllers/favarite");

const favoriteRouter = express.Router();

favoriteRouter.post("/favorite", addToFavorite);

module.exports = favoriteRouter;
