// dependencies
const http = require("http");
// const { handleReqRes } = require("./helpers/handleReqRes");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 4000,
};

//create a server object:
// app.createServer = () => {
//   const server = http.createServer(function (req, res) {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   });
//   server.listen(app.config.port, () => {
//     console.log(`listening to port ${app.config.port}`);
//   });
// };
var fs = require("fs");

app.createServer = () => {
  const server = http.createServer(function (req, res) {
   fs.readFile("file.html", function (err, data) {
     res.writeHead(200, { "Content-Type": "text/html" });
     res.write(data);
     return res.end();
   });
  });
  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
  });
};
// console.log(module);


// handle Request Response
// app.handleReqRes = handleReqRes;

// start the server
app.createServer();
