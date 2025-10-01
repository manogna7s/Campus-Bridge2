// Comprehensive diagnostic script for Campus Bridge
require('dotenv').config();
const mysql = require('mysql2');

console.log('=== Campus Bridge Comprehensive Diagnostic ===\n');

// Check environment variables
console.log('1. Environment Variables Check:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('   PORT:', process.env.PORT || 'NOT SET');
console.log('   APP_URL:', process.env.APP_URL || 'NOT SET');
console.log('   MYSQL_HOST:', process.env.MYSQL_HOST || 'NOT SET');
console.log('   MYSQL_USER:', process.env.MYSQL_USER || 'NOT SET');
console.log('   MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'NOT SET');
console.log('   MYSQL_SSL:', process.env.MYSQL_SSL || 'NOT SET');
console.log('   EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'NOT SET');
console.log('   EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');

// Validate APP_URL
console.log('\n2. APP_URL Validation:');
if (process.env.APP_URL) {
  try {
    const url = new URL(process.env.APP_URL);
    console.log('   Protocol:', url.protocol);
    console.log('   Hostname:', url.hostname);
    console.log('   Valid Render URL:', url.hostname.includes('onrender.com') ? 'YES' : 'NO');
  } catch (err) {
    console.log('   ERROR: Invalid URL format -', err.message);
  }
} else {
  console.log('   ERROR: APP_URL is not set');
}

// Test database connection
console.log('\n3. Database Connection Test:');
const connectionConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'lms',
  ssl: process.env.MYSQL_SSL === 'false' ? false : undefined,
};

console.log('   Connection config:', {
    host: connectionConfig.host,
    port: connectionConfig.port,
    user: connectionConfig.user,
    database: connectionConfig.database,
    ssl: connectionConfig.ssl
  });

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) {
    console.log('   ERROR: Database connection failed -', err.message);
    console.log('   ERROR CODE:', err.code);
    if (err.code === 'ECONNREFUSED') {
      console.log('   POSSIBLE FIX: Check if MYSQL_SSL is set to false for FreeSQLDatabase.com');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('   POSSIBLE FIX: Check database credentials');
    } else if (err.code === 'ENOTFOUND') {
      console.log('   POSSIBLE FIX: Check database host');
    }
    process.exit(1);
  }
  console.log('   SUCCESS: Database connected');

  // Test database queries
  console.log('\n4. Database Query Tests:');
  
  // Test simple query
  connection.query('SELECT 1 as test', (err, results) => {
    if (err) {
      console.log('   ERROR: Simple query failed -', err.message);
    } else {
      console.log('   SUCCESS: Simple query passed -', results[0].test);
    }
    
    // Check users table
    connection.query('SHOW TABLES LIKE "users"', (err, results) => {
      if (err) {
        console.log('   ERROR: SHOW TABLES failed -', err.message);
      } else {
        if (results.length > 0) {
          console.log('   SUCCESS: Users table exists');
          
          // Check table structure
          connection.query('DESCRIBE users', (err, results) => {
            if (err) {
              console.log('   ERROR: DESCRIBE users failed -', err.message);
            } else {
              console.log('   SUCCESS: Users table structure verified');
              const requiredColumns = ['id', 'name', 'email', 'password', 'is_verified', 'reset_token'];
              const existingColumns = results.map(row => row.Field);
              const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));
              
              if (missingColumns.length > 0) {
                console.log('   WARNING: Missing columns in users table:', missingColumns);
              } else {
                console.log('   SUCCESS: All required columns present in users table');
              }
            }
            
            // Check if sample user exists
            connection.query("SELECT COUNT(*) as count FROM users WHERE email = 'test@example.com'", (err, results) => {
              if (err) {
                console.log('   ERROR: Sample user check failed -', err.message);
              } else {
                console.log('   INFO: Sample user exists:', results[0].count > 0 ? 'YES' : 'NO');
              }
              
              connection.end();
              console.log('\n=== Diagnostic Complete ===');
            });
          });
        } else {
          console.log('   ERROR: Users table does not exist');
          connection.end();
          console.log('\n=== Diagnostic Complete ===');
        }
      }
    });
  });
});