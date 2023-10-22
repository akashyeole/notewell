const jwt = require("jsonwebtoken");

// Get user data of already logged in user using authtoken
const fetchUser = (req, res, next)=>{
    const authToken = req.header("Auth-Token");
    if(!authToken){
        res.status(401).json({error: "Invalid token"});
    }else{
        try{
            // Verify auth token
            const data = jwt.verify(authToken, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch(err){
            res.status(401).json({error: "Invalid token"});
        }
    }
}

module.exports = fetchUser;