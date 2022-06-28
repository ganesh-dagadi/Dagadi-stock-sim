const jwt = require('jsonwebtoken');
const db = require('../db/index')
async function authenticateUser(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(400).json({ error: "No accessToken provided in request. Please Login" })
    try {
        const tokenData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const userData = await db.query('SELECT * FROM person WHERE _id = $1', [tokenData._id]);
        req.user = userData.rows[0];
        next()
    } catch (err) {
        return res.status(401).json({ error: "Access token invalid" })
    }
}
module.exports = {
    authenticateUser: authenticateUser
}