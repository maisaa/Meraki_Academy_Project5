const express = require("express");

//controllers
const { addSport, deleteSport, getAllSports } = require("../controllers/sport");
//middle-wares
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const sportRouter = express.Router();

sportRouter.post("/sports", addSport);
sportRouter.delete("/sports/:id",authentication ,authorization('1'), deleteSport);
sportRouter.get("/sports", getAllSports);

module.exports = sportRouter;
