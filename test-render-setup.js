// Test script to verify Render setup
require('dotenv').config();
const mysql = require('mysql2');

console.log('=== Testing Render Setup ===');
console.log('APP_URL:', process.env.APP_URL);
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_SSL setting:', process.env.MYSQL_SSL);

// Test URL parsing
try {
  const appUrl = new URL(process.env.APP_URL);
  console.log('Parsed APP_URL hostname:', appUrl.hostname);
  
  // Check if it matches Render pattern
  if (appUrl.hostname.includes('onrender.com')) {
    console.log('✅ APP_URL appears to be a valid Render URL');
  } else {
    console.log('⚠️  APP_URL may not be a Render URL');
  }
} catch (err) {
  console.log('❌ Error parsing APP_URL:', err.message);
}

// Test database connection with Render settings
console.log('\n=== Testing Database Connection ===');
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.MYSQL_SSL === 'false' ? false : undefined,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.log('   This might be because MYSQL_SSL is not set to false for FreeSQLDatabase.com');
    }
    process.exit(1);
  }
  console.log('✅ Database connection successful');
  
  // Test a simple query
  connection.query('SELECT 1 as connected', (err, results) => {
    if (err) {
      console.error('❌ Simple query failed:', err.message);
      connection.end();
      process.exit(1);
    }
    console.log('✅ Simple query successful:', results[0].connected);
    
    // Check if users table exists
    connection.query('SHOW TABLES LIKE "users"', (err, results) => {
      if (err) {
        console.error('❌ SHOW TABLES query failed:', err.message);
        connection.end();
        process.exit(1);
      }
      
      if (results.length > 0) {
        console.log('✅ Users table exists');
      } else {
        console.log('⚠️  Users table does not exist (you may need to run init-db script)');
      }
      
      connection.end();
      console.log('\n=== All Tests Completed ===');
    });
  });
});