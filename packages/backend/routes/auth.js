const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, getUser, refreshTheToken, logoutUser } = require("../controllers/AuthController");
const verifyJWT = require("../middleware/verifyJWT");

// User registeration route
router.post("/registeruser", 
    [
        body("name", "Minimum name length must be 3 characters").isLength({ min: 3 }),
        body("email", "Invalid email").isEmail(),
        body("password", "Minimum password length must be 8 characters").isLength({ min: 8 })
    ],
    registerUser
);

// User login route
router.post("/loginuser",
    [
        body("email", "Invalid email").isEmail(),
        body("password", "Minimum password length must be 8 characters").isLength({ min: 8 })
    ],
    loginUser
)

// Logout route
router.get("/logoutuser", logoutUser);

// Fetch logged in user route
router.get("/getuser",
    verifyJWT,
    getUser
)

// Ger fresh access token
router.get("/refreshtoken", refreshTheToken);

module.exports = router;