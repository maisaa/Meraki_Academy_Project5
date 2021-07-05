const express = require("express");
const {
  getAllUsers,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllUsersPost,
  getProfileById1,
  getAllUsersPost1,
  getAllUsers1,
  getProfileFirstName,
} = require("./../controllers/profile");
//middle-wares
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const profileRouter = express.Router();

profileRouter.get("/usersByRole", getAllUsers);
profileRouter.get("/usersByRolee", getAllUsers1);
profileRouter.get("/usersPost", getAllUsersPost);
profileRouter.get("/usersPost1/:id", getAllUsersPost1);
profileRouter.get("/users/:id", getProfileById);
profileRouter.get("/usersInfo/:id", getProfileById1);
profileRouter.put("/users/:id", updateProfile);
profileRouter.post("/search", getProfileFirstName);
profileRouter.put("/user/:id", deleteProfile); // authentication, authorization("Admin"),
profileRouter.delete("/usersPost", authentication, authorization("Admin"), deleteProfile);
authentication, authorization("Admin"), (module.exports = profileRouter);
