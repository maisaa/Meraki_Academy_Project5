const express = require("express");

//controllers
const { addSport } = require("../controllers/sport");

const sportRouter = express.Router();

sportRouter.post("/sports", addSport);

module.exports = sportRouter;
