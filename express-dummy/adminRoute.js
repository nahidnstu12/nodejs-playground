const express = require("express");

const adminRoute = express.Router();

adminRoute.param("id", (req, res, next, id) => {
  req.user = id === "1" ? "Admin" : "User";
  next();
});
adminRoute.get("/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

adminRoute.get("/users", (req, res) => {
  res.json(["nahid", "nishat"]);
});

adminRoute.get("/users/:id", (req, res) => {
  res.send("Comming from " + req.user + req.params.id);
});

adminRoute
  .route("/test/")
  .get((res, req) => {
    console.log(req.method);
    res.send("post");
  })
  .post((req, res) => {
    console.log(req.method);
    res.send("post");
  });

module.exports = adminRoute;
