"use strict";

import Sequelize from "sequelize";
import config from "./config.mjs";
import dtbase from "./database.mjs";

const { use_env_variable } = dtbase[config.environment];
const { dbConfig } = config;
const { database, username, password } = dbConfig;

let db;
if (use_env_variable) {
  db = new Sequelize(process.env[use_env_variable], dtbase[config.environment]);
} else {
  db = new Sequelize(database, username, password, dtbase[config.environment]);
}

export default db;
