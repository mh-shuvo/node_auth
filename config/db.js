const config = require('./config.js');
const mysql = require('mysql');
const util = require('util');

const Connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    multipleStatements: true
});

Connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
});
Connection.query = util.promisify(Connection.query);
module.exports = Connection;