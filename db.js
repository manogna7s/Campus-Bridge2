require('dotenv').config(); // Load dotenv first
const mysql = require('mysql2');

// Always use MySQL for Campus Bridge (even on Render)
// Log environment variables for debugging (remove in production)
console.log('Database configuration:');
console.log('- Host:', process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost');
console.log('- Port:', process.env.MYSQL_PORT || 3306);
console.log('- User:', process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root');
console.log('- Password:', process.env.MYSQL_PASSWORD ? 'SET' : 'NOT SET');
console.log('- Database:', process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms');

// Use Render's environment variables or fallback to local settings
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.PLANETSCALE_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms',
  ssl: process.env.MYSQL_SSL === 'false' ? false : undefined, // Support for non-SSL connections
  connectTimeout: 30000, // 30 seconds timeout
  acquireTimeout: 30000, // 30 seconds timeout
  timeout: 30000, // 30 seconds timeout
  reconnect: true, // Enable reconnection
  reconnectDelay: 2000, // 2 seconds delay between reconnection attempts
  reconnectDelayMax: 10000, // Maximum 10 seconds delay
  reconnectAttempts: 5 // Maximum reconnection attempts
});

connection.on('error', (err) => {
  console.error('❌ MySQL connection error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Attempting to reconnect to database...');
    handleDisconnect();
  }
});

connection.on('connect', () => {
  console.log('✅ Connected to MySQL database');
});

// Handle connection disconnect
function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.error('❌ MySQL connection failed:', err);
      console.error('Connection details:');
      console.error('- Host:', process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost');
      console.error('- Port:', process.env.MYSQL_PORT || 3306);
      console.error('- User:', process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root');
      console.error('- Password:', process.env.MYSQL_PASSWORD ? 'SET' : 'NOT SET');
      console.error('- Database:', process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms');
      
      // Retry connection after delay
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log('✅ Successfully connected to MySQL database');
  });
}

// Initial connection
handleDisconnect();

// Add a ping function to check connection health
connection.ping((err) => {
  if (err) {
    console.error('❌ Database ping failed:', err);
  } else {
    console.log('✅ Database ping successful');
  }
});

module.exports = connection;