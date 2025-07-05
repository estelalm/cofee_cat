const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  ssl: {
    ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem'),
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000,  
  acquireTimeout: 30000
});

module.exports = connection.promise();
