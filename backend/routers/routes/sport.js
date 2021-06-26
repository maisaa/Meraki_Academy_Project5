const express = require("express");

//controllers
const { addSport, deleteSport, getAllSports } = require("../controllers/sport");

const sportRouter = express.Router();

sportRouter.post("/sports", addSport);
sportRouter.delete("/sports/:id", deleteSport);
sportRouter.get("/sports", getAllSports);

module.exports = sportRouter;
