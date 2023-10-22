const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
require("dotenv").config();

// Middleware for allowing JSON format data
app.use(express.json());
app.use(cors());

// Linking routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/note", require("./routes/note"));


// Connect mongoose and then start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection established with database!");
        app.listen(process.env.PORT, () => {
            console.log(`App started on http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
