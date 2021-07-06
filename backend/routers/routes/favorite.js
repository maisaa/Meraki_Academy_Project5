const express = require("express");

//controllers

const { addToFavorite, getFavorite, deleteFavorite } = require("../controllers/favorite");

const favoriteRouter = express.Router();

favoriteRouter.post("/favorite", addToFavorite);
favoriteRouter.get("/favorite/:id", getFavorite);
favoriteRouter.put("/favorite", deleteFavorite);

module.exports = favoriteRouter;
