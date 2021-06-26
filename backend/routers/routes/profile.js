const express = require('express');
const { getAllUsers,getProfileById,updatProfile,deleteProfile} = require('./../controllers/profile')

const profileRouter = express.Router();

profileRouter.get('/users', getAllUsers)
profileRouter.get('/users/:id', getProfileById)
profileRouter.put('/users/:id', updatProfile )
profileRouter.delete('/users/:id', deleteProfile )
module.exports=profileRouter;
