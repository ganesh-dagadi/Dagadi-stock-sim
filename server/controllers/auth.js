const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.signupUser = async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query("INSERT INTO person (username , password , isActive) VALUES ($1 , $2 , $3)", [username, hashedPassword, true]);
        return res.status(200).json({ msg: "User created. Please login" });
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.loginUser = async function (req, res, next) {
    const { username, password } = req.body;
    try {
        const data = await db.query(`SELECT * FROM person WHERE username = '${username}'`);
        if (data.rowCount == 0) return res.status(404).json({ err: 'Username does not exist' });
        userData = data.rows[0];
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) return res.status(403).json({ err: "Password is incorrect" });
        const accessToken = jwt.sign({
            user_id: userData._id,
            username: userData.username
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: 1200
            }
        )

        const refreshToken = jwt.sign({
            user_id: userData._id,
            username: userData.username
        },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: 1200
            }
        )
        await db.query('UPDATE person SET ref_token = $1 WHERE username = $2', [refreshToken, username]);
        res.cookie("accessToken", accessToken, {
            expiresIn: 1000 * 60 * 20,
            httpOnly: true,
            sameSite: "strict",
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            path: '/api/auth'
        })
        userData.ref_token = null;
        res.status(200).json({ user: userData })

    } catch (err) {

    }
}