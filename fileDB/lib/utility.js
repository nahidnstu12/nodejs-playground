const crypto = require("crypto");
const env = require("../helpers/environment");

// scafold
const utility = {};

// parse json
utility.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

// hash function
utility.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", env.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};

// validation
utility.payloadValidString = (name) => {
  return typeof name === "string" && name.trim().length > 0 ? name : false;
};

utility.payloadValidPhone = (name,len=11) => {
  return typeof name === "string" && name.trim().length === len ? name : false;
};
utility.payloadValidBool = (name) => {
  return typeof name === "boolean" && name ? name : false;
};

//create random string
utility.createRandomString = (strlen) => {
  typeof strlen === "number" && strlen > 0 ? strlen : false;
  if (strlen) {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let output = "";
    for (let i=0;i<strlen;i++) {
      let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      output += randomChar;
    }
    return output
  }
  return false
};
// console.log(utility.createRandomString(20));
// console.log("3kiw0470xiez35wz5tkt3rra2wzimuja7g9t".length);
module.exports = utility;
