const express = require("express");
const cors = require("cors");
const db = require("./db/db");

//routers
const loginRouter = require("./routers/routes/auth/login");
const registerRouter = require("./routers/routes/auth/signUp");
const sportRouter = require("./routers/routes/sport");
const profileRouter = require('./routers/routes/profile');
const commentRouter = require("./routers/routes/comment");
const imageRouter=require("./routers/routes/Image");
const app = express();

//third-party middleware
app.use(express.json());
app.use(cors());

//app routers
app.use(loginRouter);
app.use(registerRouter);
app.use(sportRouter);
app.use(commentRouter)
app.use(profileRouter)
app.use(imageRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server On ${PORT}`);
});
