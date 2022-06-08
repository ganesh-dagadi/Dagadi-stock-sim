require('dotenv').config();

const express = require('express');
const db = require('./db/index')

const app = express();

db.dbConfig();

// async function test() {
//     const query = "CREATE TABLE users (_id SMALLSERIAL PRIMARY KEY, username varchar(20) );"
//     const res = await db.query(query)
//     console.log(res)
// }
// test();

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})