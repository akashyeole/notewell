const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/NoteController");
const verifyJWT = require("../middleware/verifyJWT");

// Get all notes of an user route
router.get("/getallnotes",
    verifyJWT,
    getAllNotes
)

router.post("/createnote",
    verifyJWT,
    [
        body("title", "Minimum length 1").isLength({ min: 1 }),
    ],
    createNote
)

router.put("/updatenote/:id",
    verifyJWT,
    updateNote
)

router.delete("/deleteNote/:id",
    verifyJWT,
    deleteNote,
)

module.exports = router;