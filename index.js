// dependencies
const http = require("http");
const { handleResReq } = require("./helpers/handleReqRes");
const env = require("./helpers/environment");
const data = require("./lib/operation");

// app object - module scaffolding
const app = {};

// test
data.write(
  "test",
  "testFile",
  { name: "Nahid", age: "12", role: "admin" },
  (err) => {
    console.log("err was " + err);
  }
);

// create a server object:
app.createServer = () => {
  const server = http.createServer(app.handleResReq);
  server.listen(env.port, () => {
    console.log(`listening to port ${env.port}`);
  });
};

// handle Request Response
app.handleResReq = handleResReq;

// start the server
app.createServer();
