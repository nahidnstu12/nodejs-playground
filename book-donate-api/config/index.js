/**
 * Environment File
 */

const env = {};

// constants
const local_hostname = "127.0.0.1";
const local_port = "4100";
const local_env = "local";

env.local = {
  hostname: local_hostname,
  port: local_port,
  envName: local_env,
};

const currentEnv =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : local_env;

const envToExport =
  typeof process.env.NODE_ENV === "object" ? env[currentEnv] : env.local;

module.exports = envToExport;
