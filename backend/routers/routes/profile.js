const express = require("express");
const {
  getAllUsers,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllUsersPost,
} = require("./../controllers/profile");
//middle-wares
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const profileRouter = express.Router();

profileRouter.get("/users", getAllUsers);
profileRouter.get("/usersPost", getAllUsersPost);
profileRouter.get("/users/:id", getProfileById);
profileRouter.put("/users/:id", updateProfile);
profileRouter.delete("/users/:id", authentication, authorization("Admin"), deleteProfile);
module.exports = profileRouter;
