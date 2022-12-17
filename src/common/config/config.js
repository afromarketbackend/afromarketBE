const secrets = require("./keys");

module.exports = {
  development: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.dbPort,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.dbPort,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.dbPort,
    dialect: "mysql",
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      bigNumberStrings: true,
      //   ssl: {
      //     ca: readFileSync(__dirname + "/mysql-ca-master.crt"),
      //   },
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  },
};
