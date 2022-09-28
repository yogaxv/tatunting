// import sequelize
const { Sequelize } = require("sequelize");

// create connection
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', //optional
});

// export connection
module.exports = db;