const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, getUser } = require("../controllers/AuthController");
const fetchUser = require("../middleware/fetchuser");

// User registeration route
router.post("/registeruser", 
    [
        body("name", "Minimum length 3").isLength({ min: 3 }),
        body("email", "Invalid email").isEmail(),
        body("password", "Minimum length 8").isLength({ min: 8 })
    ],
    registerUser
);

// User login route
router.post("/loginuser",
    [
        body("email", "Invalid email").isEmail(),
        body("password", "Minimum length 8").isLength({ min: 8 })
    ],
    loginUser
)

// Fetch logged in user route
router.post("/getuserbytoken",
    fetchUser,
    getUser
)

module.exports = router;