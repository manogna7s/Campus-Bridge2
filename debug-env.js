// Debug environment variables
require('dotenv').config();

console.log('=== Environment Variable Debug Info ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST || 'NOT SET');
console.log('MYSQL_USER:', process.env.MYSQL_USER || 'NOT SET');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'NOT SET');
console.log('APP_URL:', process.env.APP_URL || 'NOT SET');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');

// Check if APP_URL matches expected pattern
if (process.env.APP_URL) {
  console.log('\n=== URL Validation ===');
  try {
    const url = new URL(process.env.APP_URL);
    console.log('APP_URL Protocol:', url.protocol);
    console.log('APP_URL Hostname:', url.hostname);
    console.log('APP_URL Port:', url.port);
  } catch (err) {
    console.log('Invalid APP_URL format:', err.message);
  }
}

console.log('\n=== Recommendations ===');
console.log('1. Ensure APP_URL matches your Render URL: https://campus-bridge-2-ta0g.onrender.com');
console.log('2. Make sure MYSQL_SSL is set to false for FreeSQLDatabase.com');
console.log('3. Verify all database credentials are correct');