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
            _id: userData._id,
            username: userData.username
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: 1200
            }
        )

        const refreshToken = jwt.sign({
            _id: userData._id,
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
            path: '/auth'
        })
        userData.ref_token = null;
        res.status(200).json({ user: userData })

    } catch (err) {
        next(err);
    }
}

module.exports.newToken = async function (req, res, next) {
    let token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ error: "please include refreshToken in cookie" })
    try {
        const data = await db.query('SELECT * FROM person WHERE ref_token = $1', [token]);
        if (data.rowCount == 0) return res.status(403).json({ error: { msg: "Invalid token", isRefreshTokenError: true } })
        try {
            const tokenData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            const newToken = jwt.sign(
                {
                    _id: tokenData._id,
                    username: tokenData.username
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: 120 // 20 minutes
                }
            )
            res.cookie('accessToken', newToken, {
                httpOnly: true,
                sameSite: 'strict',
                expiresIn: 1000 * 60 * 2
            })
            res.status(200).json({ msg: "Success" })
        } catch (error) {
            res.status(403).json({ error: { msg: "Invalid refresh token", isRefreshTokenError: true } })
        }
    } catch (err) {
        next(err)
    }
}


module.exports.logoutUser = async function (req, res, next) {
    let refToken = req.cookies.refreshToken;
    let accessToken = req.cookies.accessToken;
    if (!refToken || !accessToken) return res.status(400).json({ error: "tokens not provided in cookie" })
    try {
        let data = await db.query('SELECT * FROM person WHERE ref_token = $1', [refToken]);
        if (data.rowCount == 0) return res.status(403).json({ error: { msg: "Invalid token", isRefreshTokenError: true } })
        dbToken = data.rows[0].ref_token;

        await db.query('UPDATE person SET ref_token = $1 WHERE ref_token = $2', ['null', dbToken]);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/api/auth'
        })
        res.clearCookie('accessToken', {
            expiresIn: 1000 * 60 * 20,   // 20 minutes
            httpOnly: true,
            sameSite: "strict"
        })
        res.status(200).json({ msg: "User logged out" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}