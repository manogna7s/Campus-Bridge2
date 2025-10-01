// Test database connection script
require('dotenv').config();
const mysql = require('mysql2');

console.log('Testing database connection with the following configuration:');
console.log('- Host:', process.env.MYSQL_HOST);
console.log('- Port:', process.env.MYSQL_PORT);
console.log('- User:', process.env.MYSQL_USER);
console.log('- Database:', process.env.MYSQL_DATABASE);
console.log('- SSL:', process.env.MYSQL_SSL === 'false' ? 'Disabled' : 'Enabled (default)');

// Create connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.MYSQL_SSL === 'false' ? false : undefined,
});

// Test connection
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Successfully connected to MySQL database');
  
  // Test a simple query
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err);
      connection.end();
      process.exit(1);
    }
    console.log('✅ Simple query test passed:', results[0].solution);
    
    // Test if users table exists
    connection.query('SHOW TABLES LIKE "users"', (err, results) => {
      if (err) {
        console.error('❌ SHOW TABLES query failed:', err);
        connection.end();
        process.exit(1);
      }
      
      if (results.length > 0) {
        console.log('✅ Users table exists');
      } else {
        console.log('⚠️  Users table does not exist (you may need to run init-db script)');
      }
      
      // Close connection
      connection.end();
      console.log('✅ Database connection test completed successfully');
    });
  });
});