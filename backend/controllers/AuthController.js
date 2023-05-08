const User  = require("../models/User");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller to register new user
const registerUser = (req, res)=>{
    const errors = validationResult(req);
    // Check fields validation
    if(errors.isEmpty()){
        // Check if user already exists
        User.findOne({email: req.body.email}).then(async (isFound)=>{
            // If yes send error
            if(isFound){
                res.status(400).json({errors: [{type: "db", msg: "User already registered with this email"}]});
            }else{
                // Otherwise add user
                // salting and hashing
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                }).then((user)=>{
                    // creating authToken
                    const authToken = jwt.sign({id: user.id}, process.env.JWT_SECRET);
                    res.status(200).json({authToken});
                }).catch((err)=>{
                    res.status(400).json({errors: [{type: "db", msg: err.message}]});
                });
            }
        }).catch((err)=>{
            res.status(500).json({errors: [{type: "db", msg: err.message}]});
        });
    }else{
        res.status(500).json(errors);
    }
}

module.exports ={
    registerUser
}
