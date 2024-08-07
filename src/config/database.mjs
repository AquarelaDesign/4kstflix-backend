// import { Sequelize } from "sequelize";
import config from "./config.mjs";
// import dotenv from "dotenv/config.js";

const { username, password, database, host } = config.dbConfig;

// const sequelize = new Sequelize(database, username, password, {
//   dialect: "mysql",
//   host: host,
// });

const db = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  test: {
    dialect: "sqlite",
    DB_CONN: "sqlite.memory",
    logging: false,
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    seederStorage: "sequelize",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default db;
