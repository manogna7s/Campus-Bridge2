const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'caboose.proxy.rlwy.net',   // Railway Public Host
  port: 52684,                      // Railway Public Port
  user: 'root',                     // Railway User
  password: 'FVbvwMquwHxLDaCnoYPETPTLJEjxgBPb', // Railway Password
  database: 'railway'               // Railway DB name
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = connection;
