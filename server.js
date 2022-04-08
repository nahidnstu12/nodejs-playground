const express = require("express");
const fs = require("fs");
const handler = require("./handler");
const adminRoute = require("./adminRoute");
// scafold
const app = express();

// middleware
const myMiddleware = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
      req.originalUrl
    } - ${req.protocol}`
  );
  next();
};

const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("There was server side error");
};
app.use("/admin", adminRoute);
//config
const port = 3100;

//routing

// error middleware

app.get("/", (req, res, next) => {
  for (let i = 0; i <= 10; i++) {
    if (i === 3) {
      next("there was a problem on loop");
    } else {
      res.write("a");
    }
  }
  // const err = new Error("Bad Request Occuresd")
  // err.status = 400
  // throw err;
  res.end();
});

// aync error handle
app.get("/file", [
  (req, res, next) => {
    fs.readFile("./file-does-not-exist", (err, data) => {
      if (err) {
        next(err);
      } else {
        res.send(data);
      }
    });
  },
  (req, res, next) => {
    console.log(data.title);
  },
]);
app.get("/file-custom", (req, res, next) => {
  setTimeout(() => {
    try {
      console.log(a);
    } catch (err) {
      next(err);
    }
  }, 100);
});

app.use((req, res, next) => {
  const err = new Error("404 Not Found dwew");
  err.status = 404;
  next(err);
});
//will be last middleware
app.use((err, req, res, next) => {
  console.log("my Error: " + err);
  if (res.headersSent) {
    next("there was a problem on loop");
  }
  if (err.status) {
    return res.status(err.status).send(`<h1>${err.message}</h1>`);
  }
  res.status(500).send("<h1>Server Side Error</h1>");
});

//create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
