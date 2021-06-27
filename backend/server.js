const express = require("express");
const cors = require("cors");
const db = require("./db/db");

//routers
const registerRouter = require("./routers/routes/auth/signUp");
const loginRouter = require("./routers/routes/auth/login");
const favoriteRouter = require("./routers/routes/favorite");
const profileRouter = require("./routers/routes/profile");
const commentRouter = require("./routers/routes/comment");
const sportRouter = require("./routers/routes/sport");

const app = express();

//third-party middleware
app.use(express.json());
app.use(cors());

//app routers
app.use(registerRouter);
app.use(loginRouter);
app.use(sportRouter);
app.use(favoriteRouter);
app.use(commentRouter)
app.use(profileRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server On ${PORT}`);
});
