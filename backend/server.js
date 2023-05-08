const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/notes", require("./routes/notes"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connection established with database!");
    app.listen(process.env.PORT, ()=>{
        console.log(`App started on http://localhost:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})
