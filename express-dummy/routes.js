const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
const { tokenHandler } = require("./handlers/routeHandlers/tokenHandler");
const routes = {
  sample: sampleHandler,
  users: userHandler,
  token:tokenHandler
};

module.exports = routes;
