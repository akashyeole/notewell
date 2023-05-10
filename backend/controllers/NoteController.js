const Note  = require("../models/Note");
const {validationResult} = require("express-validator");


const getAllNotes = async (req, res)=>{
    try{
        const userId = req.user.id;
        // Fetch notes details by id recieved in header
        const notes = await Note.find({user: userId});
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({errors: [{type: "db", msg: err.message}]});
    }
}

const createNote = async (req, res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        // Check if user already exists
        try{
            const userId = req.user.id;
            req.body.user = userId;
            Note.create(
                req.body
            ).then((note)=>{
                res.status(200).json(note);
            }).catch((err)=>{
                res.status(400).json({errors: [{type: "db", msg: err.message}]});
            });
        }catch(err){
            res.status(500).json({errors: [{type: "db", msg: err.message}]});
        }
    }else{
        res.status(500).json(errors);
    }
}

module.exports = {
    getAllNotes,
    createNote
}