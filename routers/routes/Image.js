const express = require('express');
const { getImage,addImage,deleteImage} = require('./../controllers/Image')

const imageRouter = express.Router();

imageRouter.get('/Image',getImage)
imageRouter.post('/Image',addImage)
imageRouter.delete('/Image/:id',deleteImage )
module.exports=imageRouter;
