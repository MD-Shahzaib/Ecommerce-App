const express = require("express");
require('dotenv').config();
const app = express();
const db = require("./config/db");
const cors = require('cors')

// Connect To MongoDB.
db.connection.once("open", () => { console.log('✔✔ connect to MongoDB ✔✔') }).on("error", (err) => { console.log('Connection error ==> ', err) })

const PORT = process.env.PORT || 4000;

// Starting Server.
app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
})

app.use(express.json());
app.use(cors());

// Main Route.
app.use('/', require('./routes/index.js'));