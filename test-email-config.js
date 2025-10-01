// Test email configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== Email Configuration Test ===\n');

// Check environment variables
console.log('1. Email Environment Variables:');
console.log('   EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'NOT SET');
console.log('   EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
console.log('   EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');

// Check for placeholder values
const isUsingPlaceholders = process.env.EMAIL_USER === 'youremail@gmail.com' || 
                           process.env.EMAIL_PASS === 'your_app_password' ||
                           process.env.EMAIL_USER === 'your_email@gmail.com' || 
                           process.env.EMAIL_PASS === 'your_app_password' ||
                           process.env.EMAIL_PASS === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';

if (isUsingPlaceholders) {
  console.log('   WARNING: Using placeholder values - emails will not be sent');
} else {
  console.log('   INFO: Not using placeholder values');
}

// Test email transporter creation
console.log('\n2. Email Transporter Test:');
try {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  console.log('   SUCCESS: Transporter created');
  
  // Verify transporter configuration
  transporter.verify((err, success) => {
    if (err) {
      console.log('   ERROR: Transporter verification failed -', err.message);
      
      // Common error handling
      if (err.message.includes('Invalid login')) {
        console.log('   POSSIBLE FIX: Check Gmail App Password');
      } else if (err.message.includes('authentication')) {
        console.log('   POSSIBLE FIX: Check email credentials');
      }
    } else {
      console.log('   SUCCESS: Transporter verified');
    }
    
    console.log('\n=== Email Test Complete ===');
  });
} catch (err) {
  console.log('   ERROR: Transporter creation failed -', err.message);
  console.log('\n=== Email Test Complete ===');
}