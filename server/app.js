require('dotenv').config();

const express = require('express');
const db = require('./db/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { json, urlencoded } = express;

const app = express();

db.dbConfig();

app.use(cors());
app.use(json())
app.use(urlencoded({ extended: false }));
app.use(cookieParser())

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.use(function (err, req, res, next) {
    res.status(500).json({ error: "Something went wrong" });
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})