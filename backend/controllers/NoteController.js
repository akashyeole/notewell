const Note  = require("../models/Note");
const {validationResult} = require("express-validator");

// Controller to get all the notes created by the user
const getAllNotes = async (req, res)=>{
    try{
        const userId = req.user.id;
        // Fetch notes details by id recieved in header
        const notes = await Note.find({user: userId});
        res.status(200).json(notes);
    }catch(err){
        res.status(503).json({errors: [{type: "db", msg: err.message}]});
    }
}

// Controller function to create a new note in db
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
                res.status(503).json({errors: [{type: "db", msg: err.message}]});
            });
        }catch(err){
            res.status(503).json({errors: [{type: "db", msg: err.message}]});
        }
    }else{
        res.status(500).json(errors);
    }
}

// Controller to update a note already existing in the db
const updateNote = async (req, res)=>{
    try{
        const {title, description, tag} = req.body;
        let newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;
        
        // Verify if th euser is authorized to do the updation
        const noteResult = await Note.findById(req.params.id);
        if(!noteResult) res.status(404).json({errors: [{type: "rnf", msg: "Note not found"}]});
        else{     
            if(noteResult.user.toString() !== req.user.id) res.status(401).json({errors: [{type: "ua", msg: "Unauthorized access denied"}]})
            else{
                newNote = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
                res.status(200).json(newNote);
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
}

// Controller to delete the existing note from db
const deleteNote = async (req, res)=>{
    try{
        const noteResult = await Note.findById(req.params.id);
        if(!noteResult) res.status(404).json({errors: [{type: "rnf", msg: "Note not found"}]});
        else{
            if(noteResult.user.toString() !== req.user.id) res.status(401).json({errors: [{type: "ua", msg: "Unauthorized access denied"}]})
            else{
                const delNote = await Note.findByIdAndDelete(req.params.id);
                res.status(200).json({res: "Successfull"}, delNote);
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}