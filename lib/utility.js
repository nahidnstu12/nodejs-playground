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
utility.payloadValidPhone = (name) => {
  return typeof name === "string" && name.trim().length === 11 ? name : false;
};
utility.payloadValidBool = (name) => {
  return typeof name === "boolean" && name ? name : false;
};


module.exports = utility