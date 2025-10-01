// Enhanced email configuration for Render deployment
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== Enhanced Email Configuration for Render ===\n');

// Enhanced transporter configuration with timeout and retry settings
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 30000      // 30 seconds
});

// Test email with enhanced error handling
const mailOptions = {
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'Campus Bridge - Enhanced Email Test',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50;">Enhanced Email Test</h2>
      <p>This is a test email from Campus Bridge LMS with enhanced configuration.</p>
      <p>If you receive this email, the enhanced email configuration is working.</p>
      <br>
      <p>Best regards,<br>Campus Bridge Team</p>
    </div>
  `
};

console.log('Testing enhanced email configuration...');

transporter.verify((err, success) => {
  if (err) {
    console.log('Transporter verification failed:', err.message);
  } else {
    console.log('Transporter verified successfully');
    
    // Send test email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Failed to send email:', error.message);
        
        // Specific error handling
        if (error.code === 'ETIMEDOUT') {
          console.log('CONNECTION TIMEOUT - Recommended solutions:');
          console.log('1. Check if your Gmail App Password is correct');
          console.log('2. Try using a different email service');
          console.log('3. Check Render firewall restrictions');
          console.log('4. Consider implementing email queue/retry mechanism');
        } else if (error.code === 'ECONNREFUSED') {
          console.log('CONNECTION REFUSED - Check Gmail SMTP settings');
        } else if (error.message.includes('Invalid login')) {
          console.log('INVALID LOGIN - Check Gmail App Password');
        }
      } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
      }
    });
  }
});