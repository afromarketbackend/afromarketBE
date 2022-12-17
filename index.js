const KEYS = require('./src/common/config/keys');
const { testSequelize, sequelize } = require('./src/connection');
const app = require('./src/server');

app.listen(KEYS.port, () => {
  testSequelize();
  console.log(`Server has started!... and running on port ${KEYS.port}`);
});
