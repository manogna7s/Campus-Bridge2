const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config(); // Load dotenv first

// Log environment variables for debugging
console.log('Environment variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('- PORT:', process.env.PORT || 'NOT SET');
console.log('- MYSQL_HOST:', process.env.MYSQL_HOST || 'NOT SET');
console.log('- MYSQL_USER:', process.env.MYSQL_USER || 'NOT SET');
console.log('- MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'NOT SET');
console.log('- EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('- APP_URL:', process.env.APP_URL || 'NOT SET');

const db = require('./db');
const { createSession, destroySession, getUserFromSession } = require('./middleware');
const nodemailer = require('nodemailer');
const multer = require('multer');
const crypto = require('crypto');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads/'))
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024 // 30MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed'))
    }
  }
})

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to send email confirmation
function sendEmailConfirmation(user) {
  // Check if email configuration exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email not configured - skipping email confirmation for user:', user.email);
    return;
  }
  
  // Check if using placeholder values
  const isUsingPlaceholders = process.env.EMAIL_USER === 'youremail@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_USER === 'your_email@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_PASS === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';
                             
  if (isUsingPlaceholders) {
    console.log('Email configured with placeholder values - skipping email confirmation for user:', user.email);
    return;
  }
  
  try {
    // Create transporter with enhanced configuration for Render
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

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'Campus Bridge - Login Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Login Successful!</h2>
          <p>Hello ${user.name},</p>
          <p>We're confirming that you've successfully logged into Campus Bridge LMS at ${new Date().toLocaleString()}.</p>
          <p>If this wasn't you, please contact our support team immediately.</p>
          <br>
          <p>Best regards,<br>Campus Bridge Team</p>
        </div>
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email confirmation:', error);
        // Implement fallback - log the confirmation to console
        console.log('📧 EMAIL FALLBACK: Login confirmation for', user.email, 'at', new Date().toLocaleString());
      } else {
        console.log('Email confirmation sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error setting up email confirmation for user:', user.email, error);
    // Implement fallback - log the confirmation to console
    console.log('📧 EMAIL FALLBACK: Login confirmation for', user.email, 'at', new Date().toLocaleString());
  }
}

// Function to send email verification
function sendEmailVerification(user, token) {
  // Check if email configuration exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email not configured - skipping email verification for user:', user.email);
    // Still return success to the user so they can proceed
    return;
  }
  
  // Check if using placeholder values
  const isUsingPlaceholders = process.env.EMAIL_USER === 'youremail@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_USER === 'your_email@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_PASS === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';
                             
  if (isUsingPlaceholders) {
    console.log('Email configured with placeholder values - skipping email verification for user:', user.email);
    return;
  }
  
  try {
    // Create transporter with enhanced configuration for Render
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

    // Define email options
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/verify-email?token=${token}&email=${user.email}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'Campus Bridge - Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Welcome to Campus Bridge!</h2>
          <p>Hello ${user.name},</p>
          <p>Thank you for registering with Campus Bridge LMS. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>If you didn't create an account with us, please ignore this email.</p>
          <br>
          <p>Best regards,<br>Campus Bridge Team</p>
        </div>
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
        // Implement fallback - log the verification link to console and store in database
        console.log('📧 EMAIL FALLBACK: Verification link for', user.email, ':', verificationUrl);
        storeVerificationToken(user.email, token);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error setting up email verification for user:', user.email, error);
    // Implement fallback - log the verification link to console and store in database
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/verify-email?token=${token}&email=${user.email}`;
    console.log('📧 EMAIL FALLBACK: Verification link for', user.email, ':', verificationUrl);
    storeVerificationToken(user.email, token);
  }
}

// Function to send password reset email
function sendPasswordResetEmail(user, token) {
  // Check if email configuration exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email not configured - skipping password reset email for user:', user.email);
    // Return a special value to indicate email is not configured
    return 'NOT_CONFIGURED';
  }
  
  // Check if using placeholder values
  const isUsingPlaceholders = process.env.EMAIL_USER === 'youremail@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_USER === 'your_email@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_PASS === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';
                             
  if (isUsingPlaceholders) {
    console.log('Email configured with placeholder values - skipping password reset email for user:', user.email);
    return 'NOT_CONFIGURED';
  }
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Define email options
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password.html?token=${token}&email=${user.email}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'Campus Bridge - Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your password for your Campus Bridge account. If you didn't make this request, you can safely ignore this email.</p>
          <p>To reset your password, click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <br>
          <p>Best regards,<br>Campus Bridge Team</p>
        </div>
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
        return false;
      } else {
        console.log('Password reset email sent:', info.response);
        return true;
      }
    });
  } catch (error) {
    console.error('Error setting up password reset email for user:', user.email, error);
    return false;
  }
}

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded PDFs
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API route for PDFs
app.get('/api/resources/pdfs', (req, res) => {
  const pdfs = [
    { title: "Lecture 1 - Data Structures", pdf_url: "/uploads/DSA.pdf" },
    { title: "Lecture 2 - Operating Systems", pdf_url: "/uploads/OS.pdf" },
    { title: "Lecture 3 - Database Management Systems", pdf_url: "/uploads/DBMS.pdf" },
    { title: "Lecture 4 - Computer Networks", pdf_url: "/uploads/CN.pdf" }
  ];
  res.json(pdfs);
});

// Email verification endpoint
app.get('/api/verify-email', (req, res) => {
  console.log('Email verification request:', req.query);
  
  const { token, email } = req.query;
  
  // Simple validation
  if (!token || !email) {
    console.log('Email verification failed: Missing token or email');
    return res.status(400).send('Invalid verification link');
  }
  
  // In a real application, you would verify the token against a database
  // For this implementation, we'll just update the user as verified
  const query = 'UPDATE users SET is_verified = 1 WHERE email = ?';
  console.log('Verifying user email:', email);
  
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error during email verification:', err);
      return res.status(500).send('Internal server error');
    }
    
    console.log('Email verification result:', result.affectedRows, 'rows affected');
    
    if (result.affectedRows > 0) {
      // Redirect to login page with success message
      console.log('Email verified successfully for user:', email);
      res.redirect('/studentlogin.html?verified=true');
    } else {
      console.log('Email verification failed: No user found with email', email);
      res.status(400).send('Invalid verification link');
    }
  });
});

// User authentication endpoints
// User login endpoint
app.post('/api/login', (req, res) => {
  console.log('Login attempt:', req.body);
  
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    console.log('Login failed: Missing email or password');
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  // Check if database connection is alive
  db.ping((err) => {
    if (err) {
      console.error('Database connection lost:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error - please try again',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Query the database for the user
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    console.log('Executing login query with email:', email);
    
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Database error during login:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Internal server error - Database connection issue',
          debug: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }
      
      console.log('Login query results:', results.length, 'users found');
      
      if (results.length > 0) {
        const user = results[0];
        console.log('User found:', user.email);
        
        // Check if user is verified
        if (!user.is_verified) {
          console.log('Login failed: User not verified', user.email);
          return res.status(401).json({ 
            success: false, 
            message: 'Please verify your email address before logging in' 
          });
        }
        
        // User found, authentication successful
        // Create a session for the user
        const sessionId = createSession(user);
        console.log('Session created for user:', user.email, 'Session ID:', sessionId);
        
        // Send email confirmation
        sendEmailConfirmation(user);
        
        return res.json({ 
          success: true, 
          message: 'Login successful',
          sessionId: sessionId,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        // User not found or invalid credentials
        console.log('Login failed: Invalid credentials for email:', email);
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }
    });
  });
});

// User registration endpoint
app.post('/api/register', (req, res) => {
  console.log('Registration attempt:', req.body);
  
  const { name, email, password } = req.body;
  
  // Simple validation
  if (!name || !email || !password) {
    console.log('Registration failed: Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and password are required' 
    });
  }
  
  // Check if database connection is alive
  db.ping((err) => {
    if (err) {
      console.error('Database connection lost:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error - please try again',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    console.log('Checking if user exists:', email);
    
    db.query(checkQuery, [email], (err, results) => {
      if (err) {
        console.error('Database error during registration check:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Internal server error - Database connection issue',
          debug: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }
      
      console.log('User check results:', results.length, 'users found');
      
      if (results.length > 0) {
        // User already exists
        console.log('Registration failed: User already exists', email);
        return res.status(409).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }
      
      // Insert new user
      // Note: In a real application, you should hash the password
      const insertQuery = 'INSERT INTO users (name, email, password, is_verified) VALUES (?, ?, ?, 0)';
      console.log('Inserting new user:', name, email);
      
      db.query(insertQuery, [name, email, password], (err, result) => {
        if (err) {
          console.error('Database error during user insertion:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Internal server error - Could not create user',
            debug: process.env.NODE_ENV === 'development' ? err.message : undefined
          });
        }
        
        console.log('User inserted successfully, ID:', result.insertId);
        
        // Get the inserted user
        const user = { id: result.insertId, name, email };
        
        // Generate a simple token (in a real app, use a proper token library)
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log('Generated verification token for user:', email);
        
        // Send verification email
        sendEmailVerification(user, token);
        
        return res.status(201).json({ 
          success: true, 
          message: 'User registered successfully. Please check your email for verification.' 
        });
      });
    });
  });
});

// User logout endpoint
app.post('/api/logout', (req, res) => {
  console.log('Logout attempt:', req.body);
  
  const { sessionId } = req.body;
  
  if (sessionId) {
    console.log('Destroying session:', sessionId);
    destroySession(sessionId);
  }
  
  return res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

// Check if user is authenticated
app.get('/api/auth/check', (req, res) => {
  console.log('Auth check request');
  
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId) {
    console.log('Auth check failed: No session provided');
    return res.status(401).json({ 
      success: false, 
      message: 'No session provided' 
    });
  }
  
  const user = getUserFromSession(sessionId);
  if (!user) {
    console.log('Auth check failed: Invalid session', sessionId);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid session' 
    });
  }
  
  console.log('Auth check successful for user:', user.email);
  
  return res.json({ 
    success: true, 
    message: 'User is authenticated',
    user: user
  });
});

// Database status endpoint (for debugging) - Place this BEFORE the catch-all route
app.get('/api/db/status', (req, res) => {
  // Test database connection
  db.ping((err) => {
    if (err) {
      console.error('Database connection test failed:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection failed',
        error: err.message,
        code: err.code,
        errno: err.errno,
        // Include environment variables for debugging (remove in production)
        debug: {
          host: process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost',
          port: process.env.MYSQL_PORT || 3306,
          user: process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root',
          database: process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms'
        }
      });
    }
    
    db.query('SELECT 1 as connected', (err, results) => {
      if (err) {
        console.error('Database query test failed:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database query failed',
          error: err.message,
          code: err.code,
          errno: err.errno
        });
      }
      
      return res.json({ 
        success: true, 
        message: 'Database connected successfully',
        result: results[0]
      });
    });
  });
});

// Get users count (for debugging) - Place this BEFORE the catch-all route
app.get('/api/db/users/count', (req, res) => {
  // Check if database connection is alive
  db.ping((err) => {
    if (err) {
      console.error('Database connection lost:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    const query = 'SELECT COUNT(*) as count FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Failed to query users table:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to query users table',
          error: err.message
        });
      }
      
      return res.json({ 
        success: true, 
        count: results[0].count
      });
    });
  });
});

// Get database tables (for debugging)
app.get('/api/db/tables', (req, res) => {
  // Check if database connection is alive
  db.ping((err) => {
    if (err) {
      console.error('Database connection lost:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    const query = "SHOW TABLES";
    db.query(query, (err, results) => {
      if (err) {
        console.error('Failed to get tables:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to get tables',
          error: err.message
        });
      }
      
      return res.json({ 
        success: true, 
        tables: results
      });
    });
  });
});

// Serve the database status page - Place this BEFORE the catch-all route
app.get('/db-status.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'db-status.html'));
});

// Test email configuration endpoint
app.get('/api/test-email-config', (req, res) => {
  const emailConfig = {
    EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'NOT SET',
    EMAIL_USER: process.env.EMAIL_USER || 'NOT SET',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'SET (hidden for security)' : 'NOT SET',
    EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET'
  };
  
  const isUsingPlaceholders = process.env.EMAIL_USER === 'youremail@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_USER === 'your_email@gmail.com' || 
                             process.env.EMAIL_PASS === 'your_app_password' ||
                             process.env.EMAIL_PASS === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';
  
  res.json({ 
    success: true,
    emailConfig: emailConfig,
    isUsingPlaceholders: isUsingPlaceholders,
    isEmailConfigured: process.env.EMAIL_USER && process.env.EMAIL_PASS && !isUsingPlaceholders
  });
});

// Password reset request endpoint
app.post('/api/forgot-password', (req, res) => {
  console.log('Password reset request:', req.body);
  
  const { email } = req.body;
  
  // Simple validation
  if (!email) {
    console.log('Password reset failed: Missing email');
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }
  
  // Check if database connection is alive
  db.ping((err) => {
    if (err) {
      console.error('Database connection lost:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error - please try again',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Check if user exists
    const query = 'SELECT * FROM users WHERE email = ?';
    console.log('Checking if user exists for password reset:', email);
    
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database error during password reset check:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Internal server error - Database connection issue',
          debug: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }
      
      console.log('Password reset check results:', results.length, 'users found');
      
      if (results.length === 0) {
        // User not found - for security, we still return success
        console.log('Password reset: User not found, returning success for security');
        return res.json({ 
          success: true, 
          message: 'If an account exists with that email, a password reset link has been sent.' 
        });
      }
      
      const user = results[0];
      console.log('User found for password reset:', user.email);
      
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now
      
      // Update user with reset token
      const updateQuery = 'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?';
      console.log('Updating user with reset token:', user.id);
      
      db.query(updateQuery, [resetToken, resetTokenExpires, user.id], (err, result) => {
        if (err) {
          console.error('Database error during password reset token update:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Internal server error - Could not process password reset',
            debug: process.env.NODE_ENV === 'development' ? err.message : undefined
          });
        }
        
        console.log('Reset token updated successfully for user:', user.email);
        
        // Check if email is properly configured (not using placeholder values)
        const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS && 
                                 process.env.EMAIL_USER !== 'your_email@gmail.com' && 
                                 process.env.EMAIL_PASS !== 'your_app_password' &&
                                 process.env.EMAIL_USER !== 'youremail@gmail.com' && 
                                 process.env.EMAIL_PASS !== 'your_app_password';
        
        // Log email configuration status for debugging
        console.log('Email configuration status:', {
          EMAIL_USER: process.env.EMAIL_USER,
          EMAIL_PASS: process.env.EMAIL_PASS ? '****' : 'NOT SET',
          isEmailConfigured: isEmailConfigured
        });
        
        // If email is not configured, return a generic success message
        if (!isEmailConfigured) {
          console.log('Email not configured - password reset link not sent for user:', user.email);
          return res.json({ 
            success: true, 
            message: 'If an account exists with that email, a password reset link has been sent.'
          });
        }
        
        // Send password reset email
        const emailResult = sendPasswordResetEmail(user, resetToken);
        
        // If email is not configured, return a generic success message
        if (emailResult === 'NOT_CONFIGURED') {
          console.log('Email configuration with placeholders - password reset link not sent for user:', user.email);
          return res.json({ 
            success: true, 
            message: 'If an account exists with that email, a password reset link has been sent.'
          });
        }
        
        if (emailResult) {
          return res.json({ 
            success: true, 
            message: 'If an account exists with that email, a password reset link has been sent.' 
          });
        } else {
          // Even if email sending failed, return a generic success message
          console.log('Email sending failed - returning generic success message for user:', user.email);
          return res.json({ 
            success: true, 
            message: 'If an account exists with that email, a password reset link has been sent.'
          });
        }
      });
    });
  });
});

// Password reset endpoint
app.post('/api/reset-password', (req, res) => {
  console.log('Password reset attempt:', req.body);
  
  const { token, email, password } = req.body;
  
  // Simple validation
  if (!token || !email || !password) {
    console.log('Password reset failed: Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'Token, email, and password are required' 
    });
  }
  
  // Check if database connection is alive
  db.ping((err) => {
    if (err) {
      console.error('Database connection lost:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection error - please try again',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Check if user exists and token is valid
    const query = 'SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expires > NOW()';
    console.log('Checking reset token for user:', email);
    
    db.query(query, [email, token], (err, results) => {
      if (err) {
        console.error('Database error during password reset validation:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Internal server error - Database connection issue',
          debug: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }
      
      console.log('Password reset validation results:', results.length, 'users found');
      
      if (results.length === 0) {
        // Invalid token or expired
        console.log('Password reset failed: Invalid or expired token for user:', email);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid or expired reset token' 
        });
      }
      
      const user = results[0];
      console.log('Valid reset token found for user:', user.email);
      
      // Update password and clear reset token
      const updateQuery = 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?';
      console.log('Updating password for user:', user.id);
      
      db.query(updateQuery, [password, user.id], (err, result) => {
        if (err) {
          console.error('Database error during password update:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Internal server error - Could not update password',
            debug: process.env.NODE_ENV === 'development' ? err.message : undefined
          });
        }
        
        console.log('Password updated successfully for user:', user.email);
        
        return res.json({ 
          success: true, 
          message: 'Password has been reset successfully. You can now login with your new password.' 
        });
      });
    });
  });
});

// Add the upload route for assignments
app.post('/api/upload/assignment', upload.single('assignmentPdf'), (req, res) => {
  console.log('Assignment upload attempt:', req.body);
  
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      message: 'No file uploaded. Please select a PDF file.' 
    });
  }
  
  // Get form data
  const { studentName, assignmentTitle, questionNumber } = req.body;
  
  // Simple validation
  if (!studentName || !assignmentTitle || !questionNumber) {
    // Delete the uploaded file since the request is invalid
    const fs = require('fs');
    fs.unlinkSync(req.file.path);
    
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields: student name, assignment title, and question number.' 
    });
  }
  
  // Save assignment submission to MySQL database
  const db = require('./db');
  const insertQuery = `INSERT INTO assignments (student_name, assignment_title, question_number, file_path) VALUES (?, ?, ?, ?)`;
  db.query(
    insertQuery,
    [studentName, assignmentTitle, questionNumber, '/uploads/' + req.file.filename],
    (err, result) => {
      if (err) {
        console.error('Error saving assignment to DB:', err);
        return res.status(500).json({ success: false, message: 'Database error. Please try again.' });
      }
      console.log('Assignment uploaded and saved to DB:', {
        studentName,
        assignmentTitle,
        questionNumber,
        filename: req.file.filename,
        path: req.file.path
      });
      return res.json({ 
        success: true, 
        message: 'Assignment uploaded and saved!',
        file: {
          filename: req.file.filename,
          path: '/uploads/' + req.file.filename
        }
      });
    }
  );
});

// Catch-all for SPA/frontend routes - This should be LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server - Use Render's PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Add function to store verification tokens in database for fallback
function storeVerificationToken(email, token) {
  const query = 'INSERT INTO email_tokens (email, token, created_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE token = VALUES(token), created_at = VALUES(created_at)';
  
  db.query(query, [email, token], (err) => {
    if (err) {
      console.error('Error storing verification token in database:', err);
    } else {
      console.log('Stored verification token for email:', email);
    }
  });
}

// Add endpoint to retrieve verification token for an email
app.get('/api/get-verification-token', (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }
  
  const query = 'SELECT token FROM email_tokens WHERE email = ? ORDER BY created_at DESC LIMIT 1';
  
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error retrieving verification token:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
    
    if (results.length > 0) {
      const token = results[0].token;
      const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/verify-email?token=${token}&email=${email}`;
      return res.json({ 
        success: true, 
        verificationUrl: verificationUrl,
        message: 'Verification link retrieved successfully' 
      });
    } else {
      return res.status(404).json({ 
        success: false, 
        message: 'No verification token found for this email' 
      });
    }
  });
});

// Add endpoint to manually verify email (for testing)
app.post('/api/manual-verify', (req, res) => {
  const { email, token } = req.body;
  
  if (!email || !token) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and token are required' 
    });
  }
  
  const query = 'SELECT * FROM email_tokens WHERE email = ? AND token = ?';
  
  db.query(query, [email, token], (err, results) => {
    if (err) {
      console.error('Database error during manual verification:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
    
    if (results.length > 0) {
      // Token is valid, update user verification status
      const updateQuery = 'UPDATE users SET is_verified = 1 WHERE email = ?';
      
      db.query(updateQuery, [email], (err, result) => {
        if (err) {
          console.error('Database error updating user verification:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
          });
        }
        
        if (result.affectedRows > 0) {
          // Delete the used token
          const deleteQuery = 'DELETE FROM email_tokens WHERE email = ? AND token = ?';
          
          db.query(deleteQuery, [email, token], (err) => {
            if (err) {
              console.error('Error deleting used token:', err);
            }
          });
          
          return res.json({ 
            success: true, 
            message: 'Email verified successfully' 
          });
        } else {
          return res.status(404).json({ 
            success: false, 
            message: 'User not found' 
          });
        }
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification token' 
      });
    }
  });
});
