const express = require("express");

//controllers
const { addSport } = require("../controllers/sport");
const { deleteSport } = require("../controllers/sport");

const sportRouter = express.Router();

sportRouter.post("/sports", addSport);
sportRouter.delete("/sports/:id", deleteSport);

module.exports = sportRouter;
