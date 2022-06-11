const db = require('../db/index')
module.exports.signupValidation = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(403).json({ error: "Missing username/password" })
        const data = await db.query(`SELECT username FROM person WHERE username = '${req.body.username}'`)
        if (data.rowCount != 0) return res.status(409).json({ error: "Username is already taken." })
        next()
    } catch (err) {
        next(err)
    }
}

