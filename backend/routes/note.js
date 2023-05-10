const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { getAllNotes, createNote } = require("../controllers/NoteController");
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

module.exports = router;