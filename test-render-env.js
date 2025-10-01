// Test script to verify environment variables on Render
console.log('=== Render Environment Variables Test ===');

// Load dotenv if available (for local testing)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed or not needed in Render
}

console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'NOT SET');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET (hidden)' : 'NOT SET');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');

console.log('\n=== Placeholder Detection ===');
const isUsingPlaceholders = process.env.EMAIL_USER === 'youremail@gmail.com' || 
                           process.env.EMAIL_PASS === 'your_app_password' ||
                           process.env.EMAIL_USER === 'your_email@gmail.com' || 
                           process.env.EMAIL_PASS === 'your_app_password' ||
                           process.env.EMAIL_PASS === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';

console.log('Using placeholder values:', isUsingPlaceholders);

if (isUsingPlaceholders) {
  console.log('❌ ISSUE: Using placeholder values instead of real credentials');
  console.log('Please set real values in your Render environment variables');
} else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  console.log('✅ Environment variables appear to be properly configured');
} else {
  console.log('⚠️  Environment variables not set or incomplete');
}

console.log('\n=== Instructions ===');
console.log('1. Go to your Render dashboard');
console.log('2. Navigate to your web service settings');
console.log('3. Add these environment variables:');
console.log('   - EMAIL_SERVICE = Gmail');
console.log('   - EMAIL_USER = manognasamayam@gmail.com');
console.log('   - EMAIL_PASS = your-actual-16-character-app-password');
console.log('   - EMAIL_FROM = manognasamayam@gmail.com');
console.log('4. Redeploy your application');