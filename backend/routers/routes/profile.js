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
profileRouter.put("/user/:id", deleteProfile);// authentication, authorization("Admin"),
profileRouter.delete("/usersPost", authentication, authorization("Admin"), deleteProfile);
authentication, authorization("Admin"),
module.exports = profileRouter;
