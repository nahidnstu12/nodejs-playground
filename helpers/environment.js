// app scafold
const env = {};

// staging env
env.staging = {
  port: 4000,
  envName: "staging",
};

// production env
env.production = {
  port: 5000,
  envName: "production",
};

// determine which environment passed

const currentEnv =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

  //ISSUES
  //env[currentEnv] === production, can't sort out, it shows undefiend

// export corresponding env object
const envToExport =
  typeof env[currentEnv] === "object" ? env[currentEnv] : env.staging;

module.exports = envToExport;
