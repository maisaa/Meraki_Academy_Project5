const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const app = express();

//routers

const profileRouter = require('./routers/routes/profile');
//built-in middlewares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers

app.use(profileRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server On ${PORT}`);
});
