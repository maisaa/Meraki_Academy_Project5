const express = require("express");
const cors = require("cors");
const db = require("./db/db");
//routers

const loginRouter = require("./routers/routes/auth/login");
const registerRouter = require("./routers/routes/auth/signUp");
const sportRouter = require("./routers/routes/sport");
const favoriteRouter = require("./routers/routes/favarite");

const app = express();

const profileRouter = require("./routers/routes/profile");
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use(loginRouter);
app.use(registerRouter);
app.use(sportRouter);
app.use(favoriteRouter);

app.use(profileRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
