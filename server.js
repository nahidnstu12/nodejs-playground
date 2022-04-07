const express = require("express");
const fs = require("fs");
const handler = require("./handler");
// scafold
const app = express();
const admin = express();

// middleware
const myMiddleware = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
      req.originalUrl
    } - ${req.protocol}`
  );
  next();
};
const routerMiddleware = (req,res,next)=>{
  console.log("router level middleware")
  next()
}
// configurable
const loggerOptions = options => (req,res,next)=> {
  if(options.name === "about"){
    console.log("I am going to about")
    next()
  }else{
    throw new Error("Error Occured")
  }
}
const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("There was server side error");
};
app.use("/admin", admin);
app.use(express.json());
app.use(express.static(`${__dirname}/pages/`));
app.set("view engine", "ejs");
app.use(myMiddleware);
app.use(errorMiddleware);

// admin level
admin.get("/", (req, res) => {
  console.log(admin.mountpath);
  res.send("welcome to client app");
});
 

//config
const port = 3100;

//routing

app.get("/users",loggerOptions({name:"about"}), (req, res) => {
  res.send("I am Users");
});
//router level middleware
admin.use(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === "0") next("route");
    // otherwise pass control to the next middleware function in this stack
    else next();
    
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
admin.get("/user/:id",  (req, res) => {
  res.send("I am admin user");
});

app.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.send("regular");
  }
);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", (req, res, next) => {
  res.send("special");
});


app.get("/about", (req, res) => {
  res.render("pages/about", { name: "ecom" });
});

app.get("/user", handler);

app.post("/user", (req, res) => {
  console.log(req.route);
  res.send("welcome to client app post method");
});

// app.param("id", function (req, res, next, id) {
//   console.log("CALLED ONLY ONCE");
//   req.id = id;
//   next();
// });

// app.get("/user/:id", function (req, res, next) {
//   console.log("although this matches", req.id);
//   next();
// });

app.get("/user/:id/:salary", function (req, res) {
  console.log(req.route);
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
