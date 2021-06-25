const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const loginRouter = require('./routers/routes/auth/login');

const app = express();

//routers

//built-in middle wares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use(loginRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server On ${PORT}`);
});
