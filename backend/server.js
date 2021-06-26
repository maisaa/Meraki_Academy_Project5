const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const loginRouter = require("./routers/routes/auth/login");
const registerRouter = require("./routers/routes/auth/signUp");

const app = express();

//routers


const profileRouter = require('./routers/routes/profile');
//built-in middlewares



app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use(loginRouter);
app.use(registerRouter);

app.use(profileRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
