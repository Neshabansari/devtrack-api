// Centralized environment configuration.
// Every other module reads config from here instead of touching
// process.env directly, so defaults and parsing live in one place.

require("dotenv").config();

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

module.exports = env;
