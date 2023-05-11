const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/NoteController");
const fetchUser = require("../middleware/fetchuser");

// Get all notes of an user route
router.get("/getallnotes",
    fetchUser,
    getAllNotes
)

router.post("/createnote",
    fetchUser,
    [
        body("title", "Minimum length 1").isLength({ min: 1 }),
    ],
    createNote
)

router.put("/updatenote/:id",
    fetchUser,
    updateNote
)

router.delete("/deleteNote/:id",
    fetchUser,
    deleteNote,
)

module.exports = router;