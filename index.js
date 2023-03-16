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
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        res.send(user);
      } else {
        res.send({ result: "user not found!" });
      }
    } else {
      res.send({ result: "user not found!" });
    }
    
    
})
app.get("/", (req, res) => {
    res.send("app is working");
});


app.listen(PORT||5000);