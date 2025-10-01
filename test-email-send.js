// Test email sending
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== Email Sending Test ===\n');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email options
const mailOptions = {
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Send to yourself for testing
  subject: 'Campus Bridge - Test Email',
  text: 'This is a test email from Campus Bridge LMS to confirm email functionality is working.',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50;">Email Test Successful!</h2>
      <p>This is a test email from Campus Bridge LMS to confirm email functionality is working.</p>
      <p>If you received this email, your email configuration is correct.</p>
      <br>
      <p>Best regards,<br>Campus Bridge Team</p>
    </div>
  `
};

console.log('Sending test email to:', process.env.EMAIL_USER);

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('ERROR: Failed to send email -', error.message);
    
    // Common error handling
    if (error.message.includes('Invalid login')) {
      console.log('POSSIBLE FIX: Check Gmail App Password');
    } else if (error.message.includes('authentication')) {
      console.log('POSSIBLE FIX: Check email credentials');
    } else if (error.message.includes('limit')) {
      console.log('POSSIBLE FIX: Gmail daily sending limit reached');
    }
  } else {
    console.log('SUCCESS: Email sent successfully');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  }
  
  console.log('\n=== Email Sending Test Complete ===');
});