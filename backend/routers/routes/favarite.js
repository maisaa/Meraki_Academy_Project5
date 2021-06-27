const express = require("express");

//controllers

const { addToFavorite, getFavorite, deleteFavorite } = require("../controllers/favarite");

const favoriteRouter = express.Router();

favoriteRouter.post("/favorite", addToFavorite);
favoriteRouter.get("/favorite/:id", getFavorite);
favoriteRouter.delete("/favorite/:postID", deleteFavorite);

module.exports = favoriteRouter;
