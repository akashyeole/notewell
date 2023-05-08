const express = require("express");
const router = express.Router();
const User  = require("../models/User");
const {body} = require("express-validator");
const { registerUser } = require("../controllers/AuthController");

// User registeration route
router.post("/registeruser", 
    [
        body('name', 'Minimum length 3').isLength({ min: 3 }),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Minimum length 8').isLength({ min: 8 })
    ],
    registerUser
);

module.exports = router;