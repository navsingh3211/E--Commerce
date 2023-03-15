const express = require('express');
const cors = require("cors");
// require('./db/config');
const DB = require("./db/config");
require("dotenv").config();

const User = require("./db/User");

// console.log(process.env);
const PORT=process.env.PORT;
const app = express();

DB.connectDB();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
});

app.get("/", (req, res) => {
    res.send("app is working");
});


app.listen(PORT||5000);