const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller to register new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    // Check fields validation
    if (errors.isEmpty()) {
        // Check if user already exists
        try {
            const isFound = await User.findOne({ email: req.body.email })
            // If yes send error
            if (isFound) {
                res.status(409).json({ errors: [{ type: "validation", msg: "User already registered with this email" }] });
            } else {
                // Otherwise add user
                // salting and hashing
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                }).then(async (user) => {
                    // creating accessToken
                    const refreshToken = jwt.sign({ user: { id: user.id } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                    const accessToken = jwt.sign({ user: { id: user.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                    // await User.findByIdAndUpdate(user.id, { $set: { refreshToken: refreshToken } }).catch((e) => {
                    //     return;
                    // });
                    // user.refreshToken = refreshToken;
                    user.save();
                    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 600 * 1000 });
                    res.status(200).json({ accessToken });
                }).catch((err) => {
                    res.status(400).json({ errors: [{ type: "db", msg: err.message }] });
                });
            }
        } catch (err) {
            res.status(500).json({ errors: [{ type: "db", msg: err.message }] });
        }
    } else {
        res.status(500).json(errors);
    }
}


// Controller to verify and login user 
const loginUser = async (req, res) => {
    // Check fields validation
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // Check if user exists
        try {
            const isFound = await User.findOne({ email: req.body.email })
            // If yes verfiy credentials
            if (isFound) {
                const validCred = await bcrypt.compare(req.body.password, isFound.password);
                if (validCred) {
                    const accessToken = jwt.sign({ user: { id: isFound.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                    const refreshToken = jwt.sign({ user: { id: isFound.id } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                    // const ss = await User.findByIdAndUpdate(isFound.id, { $set: { refreshToken: refreshToken } }).catch((e) => {
                    //     return;
                    // });
                    isFound.refreshToken = refreshToken;
                    await isFound.save();
                    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 600 * 1000 });
                    res.status(200).json({ accessToken });
                } else {
                    res.status(400).json({ errors: [{ type: "validation", msg: "Invalid credentials" }] });
                }
            } else {
                // If not found bad request
                res.status(400).json({ errors: [{ type: "validation", msg: "Invalid credentials" }] });
            }
        } catch (err) {
            res.status(500).json({ errors: [{ type: "db", msg: err.message }] });
        }
    } else {
        res.status(500).json(errors);
    }
}

// Controller function for loggin out an user
const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) res.sendStatus(204);

    const refreshToken = cookies.jwt;
    try {
        const foundUser = await User.findOne({ refreshToken });
        if (foundUser) {
            foundUser.refreshToken = '';
            const result = await foundUser.save();
        }
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204);
    } catch {
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204);
    }

}

// Controller function for getting user data using id
const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetchuser details by id recieved in header
        const user = await User.findById(userId).select('-password').select("-refreshToken");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ errors: [{ type: 'db', msg: err.message }] });
    }
}

const refreshTheToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) res.status(401).json({ errors: [{ type: 'authentication', msg: 'Invalid refresh token' }] });
    else {
        const refreshToken = cookies.jwt;
        try {
            const foundUser = await User.findOne({ refreshToken });
            if (!foundUser) {
                res.status(403).json({ error: [{ type: 'authentication', msg: "Invalid refresh token" }] });
            }
            else {
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, user)=> {
                        // console.log(user, foundUser.id)
                        if(err || user.user.id !== foundUser.id) res.status(403).json({ errors: [{ type: 'authentication', msg: 'Invalid refresh token' }] });
                        else{
                            const accessToken = jwt.sign({ user: { id: user.user.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                            res.status(200).json({ accessToken });
                        }
                    }
                )
            }
        } catch (err) {
            res.status(401).json({ error: [{ type: 'Unknown', msg: "Unknown error occured" }] });
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    refreshTheToken
}
