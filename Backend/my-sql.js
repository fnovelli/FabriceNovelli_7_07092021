const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PASS, {
  host: process.env.SQL_HOST,
  dialect: 'mysql'
});


async function DBconnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

DBconnection();

