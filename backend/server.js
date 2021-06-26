const express = require("express");
const cors = require("cors");
const db = require("./db/db");
//routers

const loginRouter = require("./routers/routes/auth/login");
const registerRouter = require("./routers/routes/auth/signUp");
const sportRouter = require("./routers/routes/sport");

const app = express();

//built-in middle wares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use(loginRouter);
app.use(registerRouter);
app.use(sportRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
