const mysql = require('mysql');
const db = require('../database.json');

//RDS 연결
const connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database
});

module.exports = connection;