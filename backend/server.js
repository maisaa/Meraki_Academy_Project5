const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");

//routers
const registerRouter = require("./routers/routes/auth/signUp");
const loginRouter = require("./routers/routes/auth/login");
const favoriteRouter = require("./routers/routes/favorite");
const profileRouter = require("./routers/routes/profile");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/comment");
const sportRouter = require("./routers/routes/sport");
const imageRouter=require("./routers/routes/Image");

const app = express();

//third-party middleware
app.use(express.json());
app.use(cors());

//app routers
app.use(registerRouter);
app.use(loginRouter);
app.use(sportRouter);
app.use(favoriteRouter);
app.use(commentRouter);
app.use(imageRouter);
app.use(profileRouter);
app.use(postRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server On ${PORT}`);
});
