// dependencies
const http = require("http");
const { handleResReq } = require("./helpers/handleReqRes");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 4000,
};

// create a server object:
app.createServer = () => {
  const server = http.createServer(app.handleResReq);
  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
  });
};




// handle Request Response
app.handleResReq = handleResReq;

// start the server
app.createServer();
