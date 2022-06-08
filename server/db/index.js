const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'stocksim',
    password: process.env.DB_USER_PASS,
    port: 5432
})

module.exports = {
    dbConfig: async function () {
        try {
            await client.connect()
        } catch (err) {
            return err
        }

    },
    query: function (query, values) {
        return client.query(query, values)
    }
}