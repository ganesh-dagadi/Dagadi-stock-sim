const db = require('../db/index')
module.exports.signupValidation = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password) return res.status(403).json({ error: "Missing username/password" })
        const usernameData = await db.query(`SELECT username FROM person WHERE username = '${req.body.username}'`)
        if (usernameData.rowCount != 0) return res.status(409).json({ error: "Username is already in use." })
        const emailData = await db.query(`SELECT username FROM person WHERE email = '${email}'`)
        if (emailData.rowCount != 0) return res.status(409).json({ error: "Email is already in use." })
        next()
    } catch (err) {
        next(err)
    }
}

