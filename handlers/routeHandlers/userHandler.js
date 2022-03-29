// dependency
const data = require("../../lib/operation");
const {
  payloadValidString,
  payloadValidBool,
  payloadValidPhone,
  hash
} = require("../../lib/utility");
// scafold
const handler = {};

// methods
handler.userHandler = (req, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(req.method) > -1) {
    handler._users[req.method](req, callback);
  } else {
    callback(405);
  }
};

handler._users = {};

// post method
handler._users.post = (req, callback) => {
  const firstName = payloadValidString(req.body?.firstName);
  const lastName = payloadValidString(req.body?.lastName);
  const phone = payloadValidPhone(req.body?.phone);
  const password = payloadValidString(req.body?.password);
  const tosAgreement = payloadValidBool(req.body?.tosAgreement);

//   console.log( {debug:"debug ", firstName, lastName, phone, password, tosAgreement });

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure user doesn't exists
    data.read("users", phone, (err1) => {
      if (err1) {
        const userObj = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // create user
        data.write("users", phone, userObj, (err2) => {
          if (!err2) {
            callback(200, { message: "User was created successfully" });
          } else {
            callback(500, { error: "Could not create user!" });
          }
        });
      } else {
        callback(500, { message: "Server side error" });
      }
    });
  } else {
    callback(400, { message: "You have a problem in your request" });
  }
};

handler._users.get = (req, callback) => {
  callback(200);
};

// exports
module.exports = handler;
