const express = require("express");

//controllers

const { addToFavorite, getFavorite } = require("../controllers/favarite");

const favoriteRouter = express.Router();

favoriteRouter.post("/favorite", addToFavorite);
favoriteRouter.get("/favorite/:id", getFavorite);

module.exports = favoriteRouter;
