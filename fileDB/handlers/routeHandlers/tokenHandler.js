// dependency
const data = require("../../lib/operation");
const {
  payloadValidString,
  payloadValidBool,
  payloadValidPhone,
  hash,
  parseJSON,
  createRandomString,
} = require("../../lib/utility");
// scafold
const handler = {};

// methods
handler.tokenHandler = (req, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(req.method) > -1) {
    handler._tokens[req.method](req, callback);
  } else {
    callback(405);
  }
};

handler._tokens = {};

// post method
handler._tokens.post = (req, callback) => {
  const phone = payloadValidPhone(req.body?.phone);
  const password = payloadValidString(req.body?.password);

  //   console.log( {debug:"debug ", firstName, lastName, phone, password, tosAgreement });

  if (phone && password) {
    // checking user is available
    data.read("users", phone, (err, user) => {
      if (!err && user) {
        const hashPassword = hash(password);
        if (hashPassword === parseJSON(user).password) {
          // const token = "token+nahid"
          // const
          const tokenObj = {
            phone,
            id: createRandomString(20),
            expires: Date.now() + 3600 * 1000,
          };
          data.write("tokens", tokenObj.id, tokenObj, (err2) => {
            if (!err2) {
              callback(200, {
                message: "token was created successfully",
              });
            } else {
              callback(500, { error: "Could not create token!" });
            }
          });
        } else {
          callback(400, { message: "Password is not valid" });
        }
      } else {
        callback(404, { message: "User doesn't exists" });
      }
    });
  } else {
    callback(400, { message: "User doesn't exists" });
  }
};

handler._tokens.get = (req, callback) => {
  const id = payloadValidPhone(req.queryStringObject?.id, 20);

  if (id) {
    // http://localhost:4000/tokens?phone=01621876111
    data.read("tokens", id, (err, tokenData) => {
      const token = { ...parseJSON(tokenData) };
      if (!err && token) {
        callback(200, token);
      } else {
        callback(404, { error: "Requested token was not found 1" });
      }
    });
  } else {
    callback(404, { error: "Requested token was not found 2" });
  }
};

handler._tokens.put = (req, callback) => {
  const id = payloadValidPhone(req.body?.id, 20);
  const extend = payloadValidBool(req.body?.extend);

  if (id && extend) {
    data.read("tokens", id, (err, u) => {
      const token = { ...parseJSON(u) };
      if (!err && token.expires > Date.now()) {
        token.expires = Date.now() + 3600 * 1000;

        // store & update

        data.update("tokens", id, token, (err2) => {
          if (!err2) {
            callback(200, { message: "token was update successfully" });
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
      error: "You can't extend your token",
    });
  }
};

handler._tokens.delete = (req, callback) => {
  const id = payloadValidPhone(req.queryStringObject?.id, 20);

  if (id) {
    // http://localhost:4000/tokens?phone=01621876111
    data.read("tokens", id, (err, token) => {
      if (!err && token) {
        data.delete("tokens", id, (err2) => {
          if (!err2) {
            callback(200, { message: "token was sucessfully deleted" });
          } else {
            callback(500, { error: "Server side error" });
          }
        });
      } else {
        callback(404, { error: "Requested token was not found 1" });
      }
    });
  } else {
    callback(404, { error: "Requested token was not found 2" });
  }
};

//token verify
handler._tokens.verify = (id, phone, callback) => {
  data.read("tokens", id, (err, tokenData) => {
    if (!err && tokenData) {
      if (
        parseJSON(tokenData).phone === phone &&
        parseJSON(tokenData).expires > Date.now()
      ) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// exports
module.exports = handler;

// {
//  "phone":"01621876123",
// 	"firstName": "Asiq",
// 	"lastName": "Popy",
// 	"password":"123"
// }
