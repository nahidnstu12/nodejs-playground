// dependency
const url = require("url");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");
const routes = require("../routes");
const { StringDecoder } = require("string_decoder");

// scafold
const handler = {};

// methods
handler.handleResReq = (req, res) => {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true); // true for qs
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  // buffer data processing
  const decoder = new StringDecoder();
  let realData = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

    console.log({chosenHandler});

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};

    const payloadString = JSON.stringify(payload);

    res.writeHead(statusCode);
    res.end(payloadString);
  });
  //start reading
   req.on("data", (buffer) => {
     realData += decoder.write(buffer);
   });

   req.on("end", () => {
     realData += decoder.end();

     console.log(realData);
     // response handle
    //  res.end("completed");
   });
};

module.exports = handler;