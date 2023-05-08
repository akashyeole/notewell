const User  = require("../models/User");
const {validationResult} = require("express-validator");

// Controller to register new user
const registerUser = (req, res)=>{
    const errors = validationResult(req);
    // Check fields validation
    if(errors.isEmpty()){
        // Check if user already exists
        User.findOne({email: req.body.email}).then((isFound)=>{
            // If yes send error
            if(isFound){
                res.status(400).json({errors: [{type: "db", msg: "User already registered with this email"}]});
            }else{
                // Otherwise add user
                User.create(
                    req.body
                ).then((user)=>{
                    res.status(200).json(user);
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
