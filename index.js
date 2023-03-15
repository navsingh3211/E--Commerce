const express = require('express');
const cors = require("cors");
// require('./db/config');
const DB = require("./db/config");
require("dotenv").config();

const User = require("./db/User");
const path = require("path");

// console.log(process.env);
const PORT=process.env.PORT;
const app = express();


DB.connectDB();

app.use(express.json());
app.use(cors());

// Code block to serve frontend from server : 
// (Replace client with your frontend folder name)
//start-->
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//end<---

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
});

app.get("/", (req, res) => {
    res.send("app is working");
});


app.listen(PORT||5000);