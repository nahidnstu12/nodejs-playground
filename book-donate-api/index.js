// dependency

const http = require("node:http");
const env = require("./config/index")



// app scaffolding
const app = {};

// router configuration


// create server
app.server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  // res.end("Hello Nahid, what do you do,bro");
  res.end("Valo lagtese na kk");
});


app.server.listen(env.port,env.hostname, () => {
  console.log(`Server running at http://${env.hostname}:${env.port}`);
});
