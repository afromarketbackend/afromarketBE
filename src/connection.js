const { Sequelize } = require('sequelize');
const db = require('./db/models');
const {dev} = require('./common/config/config')
const KEYS = require('./common/config/keys');

const sequelize = new Sequelize(KEYS.dbUrl, {
  logging: (msg) => console.debug(msg), // Alternative way to use custom logger, displays all messages
  ...(process.env.NODE_ENV !== 'development' && {
    dialectOptions: {
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false, // <<<<<< YOU NEED THIS
      // },
    }
  })
});

const testSequelize = async () => {
  try {
    // await db.sequelize.sync({ alter: true });
    console.log('sequelize Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

exports.sequelize = sequelize;
exports.testSequelize = testSequelize;

