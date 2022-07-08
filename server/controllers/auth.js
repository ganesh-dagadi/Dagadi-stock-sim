const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.signupUser = async function (req, res, next) {
    try {
        const { username, password, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query("INSERT INTO person (username , password , isActive , email) VALUES ($1 , $2 , $3 , $4)", [username, hashedPassword, true, email]);
        return res.status(200).json({ msg: "User created. Please login" });
    } catch (err) {
        next(err)
    }
}

module.exports.loginUser = async function (req, res, next) {
    const { email, password } = req.body;
    try {
        const data = await db.query('SELECT * FROM person WHERE email = $1', [email]);
        if (data.rowCount == 0) return res.status(400).json({ error: 'Email does not exist' });
        userData = data.rows[0];
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) return res.status(400).json({ error: "Password is incorrect" });
        const accessToken = jwt.sign({
            _id: userData._id,
            username: userData.username
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: 120
            }
        )

        const refreshToken = jwt.sign({
            _id: userData._id,
            username: userData.username
        },
            process.env.REFRESH_TOKEN_SECRET,
        )
        await db.query('UPDATE person SET ref_token = $1 WHERE email = $2', [refreshToken, email]);
        res.cookie("accessToken", accessToken, {
            expiresIn: 1000 * 60 * 2,
            httpOnly: true,
            sameSite: "strict",
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            path: '/auth'
        })
        userData.ref_token = null;
        userData.password = null;
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
        if (data.rowCount == 0) return res.status(403).json({ error: "Invalid token", isRefreshTokenError: true })
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
            console.log(error)
            res.status(403).json({ error: "Invalid refresh token", isRefreshTokenError: true })
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
        if (data.rowCount == 0) return res.status(403).json({ error: "Invalid token", isRefreshTokenError: true })
        dbToken = data.rows[0].ref_token;

        await db.query('UPDATE person SET ref_token = $1 WHERE ref_token = $2', ['null', dbToken]);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/api/auth'
        })
        res.clearCookie('accessToken', {
            expiresIn: 1000 * 60 * 2,   // 20 minutes
            httpOnly: true,
            sameSite: "strict"
        })
        res.status(200).json({ msg: "User logged out" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}


module.exports.protectedcontrol = async function (req, res, next) {
    res.send("Hit")

}