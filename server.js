const express = require("express");
const fs = require("fs");
// scafold
const app = express();
const admin = express();

app.use("/admin", admin);

admin.get("/", (req, res) => {
  console.log(admin.mountpath)
  res.send("welcome to client app");
});
// app.use(express.text())
// app.use(express.static(`${__dirname}/pages/`))

//config
const port = 3100;

//routing

app.get("/", (req, res) => {
  res.send("welcome to client app");
});

app.param("id", function (req, res, next, id) {
  console.log("CALLED ONLY ONCE");
  req.id = id
  next();
});

app.get("/user/:id", function (req, res, next) {
  console.log("although this matches", req.id);
  next();
});

app.get("/user/:id", function (req, res) {
  console.log("and this matches too");
  res.end();
});

app.get("/", (req, res) => {
  //   res.send("<h1>Hello Nahid</h1>");
  console.log(req.body);
  fs.readFile("./pages/index.html", (err, data) => {
    if (!err) {
      res.write(data);
      res.end();
    } else {
      console.log(err);
      res.send("Something wrong");
    }
  });
});

app.get("/about", (req, res) => {
  fs.readFile("./pages/file.html", (err, data) => {
    if (!err) {
      res.write(data);
      res.end();
    }
  });
});

//create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
