const jwt = require("jsonwebtoken");

// Get user data of already logged in user using authtoken
const verifyJWT = (req, res, next) => {
    const authData = req.header("authorization") || req.header("Authorization");
    if (!authData?.startsWith('Bearer ')) {
        res.status(401).json({ error: [{type:'authentication', msg: "Invalid token"}] });
    } else {
        try {
            // Verify auth token
            const token = authData.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = data.user;
            next();
        } catch (err) {
            res.status(403).json({ error: [{type:'authentication', msg: "Invalid token"}] });
        }
    }
}

module.exports = verifyJWT;