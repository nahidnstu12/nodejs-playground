// dependency
const data = require("../../lib/operation");
const {
  payloadValidString,
  payloadValidBool,
  payloadValidPhone,
  hash,
  parseJSON,
  createRandomString
} = require("../../lib/utility");
const tokenHandler = require("./tokenHandler");
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

    console.log( {debug:"debug ", firstName, lastName, phone, password, tosAgreement });

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure user doesn't exists
    data.read("users", phone, (err1) => {
      console.log("post " + err1);
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
        // create a token
        
        // const tokenObj = {
        //   phone,
        //   id: createRandomString(20),
        //   expires: Date.now() + 3600 * 1000,
        // };
        // data.write("tokens",tokenObj.id, tokenObj, (err4)=>{
        //   if (!err4) {
        //     callback(200, {
        //       message: "token was created successfully",
        //     });
        //   } else {
        //     callback(500, { error: "Could not create token!" });
        //   }
        // })
      } else {
        callback(500, { message: "Server side error" });
      }
    });
  } else {
    callback(400, { message: "You have a problem in your request" });
  }
};

// get user
handler._users.get = (req, callback) => {
  const phone = payloadValidPhone(req.queryStringObject?.phone);
  console.log(phone);
  if (phone) {
    // http://localhost:4000/users?phone=01621876111
    const token = payloadValidString(req.headersObject?.token);
    tokenHandler._tokens.verify(token, phone, (tokenId) => {
      if (tokenId) {
        data.read("users", phone, (err, data) => {
          const user = { ...parseJSON(data) };
          if (!err && user) {
            delete user.password;
            // console.log(data);
            callback(200, user);
          } else {
            callback(404, { error: "Requested user was not found" });
          }
        });
      } else {
        callback(403, { error: "Authentication Failure" });
      }
    });
  } else {
    callback(404, { error: "Your requested phone number is not right format" });
  }
};

handler._users.put = (req, callback) => {
  const firstName = payloadValidString(req.body?.firstName);
  const lastName = payloadValidString(req.body?.lastName);
  const phone = payloadValidPhone(req.body?.phone);
  const password = payloadValidString(req.body?.password);

  if (phone) {
    const token = payloadValidString(req.headersObject?.token);
    tokenHandler._tokens.verify(token, phone, (tokenId) => {
      if (tokenId) {
        if (firstName || lastName || password) {
          data.read("users", phone, (err, u) => {
            const user = { ...parseJSON(u) };
            if (!err && user) {
              if (firstName) user.firstName = firstName;
              if (lastName) user.lastName = lastName;
              if (password) user.password = hash(password);

              // store & update

              data.update("users", phone, user, (err2) => {
                if (!err2) {
                  callback(200, { message: "User was update successfully" });
                } else {
                  callback(500, { error: "server side error" });
                }
              });
            } else {
              callback(400, {
                error: "You have a problem in your request!",
              });
            }
          });
        } else {
          callback(400, {
            error: "You have a problem in your request!",
          });
        }
      } else {
        callback(403, { error: "Authentication Failure" });
      }
    });
  } else {
    callback(400, {
      error: "Invalid phone number. Please try again!",
    });
  }
};

handler._users.delete = (req, callback) => {
  const phone = payloadValidPhone(req.queryStringObject?.phone);
  const token = payloadValidString(req.headersObject?.token);
  if (phone) {
    // http://localhost:4000/users?phone=01621876111
    tokenHandler._tokens.verify(token, phone, (tokenId) => {
      if (tokenId) {
        data.read("users", phone, (err, user) => {
          if (!err && user) {
            data.delete("users", phone, (err2) => {
              if (!err2) {
                callback(200, { message: "User was sucessfully deleted" });
              } else {
                callback(500, { error: "Server side error" });
              }
            });
          } else {
            callback(404, { error: "Requested user was not found" });
          }
        });
      } else {
        callback(403, { error: "Authentication Failure" });
      }
    });
  } else {
    callback(404, { error: "Requested user was not found" });
  }
};

// exports
module.exports = handler;
