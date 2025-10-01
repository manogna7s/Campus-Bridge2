// Database initialization script for Render deployment
// This script creates the necessary tables if they don't exist

require('dotenv').config();
const mysql = require('mysql2');

// Use environment variables
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.PLANETSCALE_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms',
  connectTimeout: 30000, // 30 seconds timeout
  acquireTimeout: 30000, // 30 seconds timeout
  timeout: 30000, // 30 seconds timeout
});

console.log('Database configuration for Render:');
console.log('- Host:', process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost');
console.log('- Port:', process.env.MYSQL_PORT || 3306);
console.log('- User:', process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root');
console.log('- Database:', process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms');

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    console.error('Connection details:');
    console.error('- Host:', process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost');
    console.error('- Port:', process.env.MYSQL_PORT || 3306);
    console.error('- User:', process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root');
    console.error('- Database:', process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms');
    process.exit(1);
  }
  console.log('✅ Successfully connected to MySQL database');
  
  // Initialize database tables
  initializeDatabase();
});

// Create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Create learning_resources table (if it doesn't exist)
const createLearningResourcesTable = `
  CREATE TABLE IF NOT EXISTS learning_resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL
  )
`;

// Create email_tokens table for email verification fallback
const createEmailTokensTable = `
  CREATE TABLE IF NOT EXISTS email_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (email)
  )
`;

function initializeDatabase() {
  console.log('Initializing database tables...');

  // Create users table
  connection.query(createUsersTable, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
      connection.end();
      return;
    }
    console.log('Users table created or already exists');
    
    // Create learning_resources table
    connection.query(createLearningResourcesTable, (err, result) => {
      if (err) {
        console.error('Error creating learning_resources table:', err);
        connection.end();
        return;
      }
      console.log('Learning resources table created or already exists');
      
      // Create email_tokens table
      connection.query(createEmailTokensTable, (err, result) => {
        if (err) {
          console.error('Error creating email_tokens table:', err);
          connection.end();
          return;
        }
        console.log('Email tokens table created or already exists');
        
        // Check if is_verified column exists
        const checkColumnQuery = "SHOW COLUMNS FROM users LIKE 'is_verified'";
        
        connection.query(checkColumnQuery, (err, results) => {
          if (err) {
            console.error('Error checking for is_verified column:', err);
            connection.end();
            return;
          }
          
          if (results.length === 0) {
            // Column doesn't exist, add it
            const addColumnQuery = "ALTER TABLE users ADD COLUMN is_verified TINYINT(1) DEFAULT 0";
            
            connection.query(addColumnQuery, (err, result) => {
              if (err) {
                console.error('Error adding is_verified column:', err);
              } else {
                console.log('is_verified column added successfully');
              }
              
              // Check if reset_token column exists
              checkAndAddResetTokenColumn();
            });
          } else {
            console.log('is_verified column already exists');
            // Check if reset_token column exists
            checkAndAddResetTokenColumn();
          }
        });
      });
    });
  });
}

function checkAndAddResetTokenColumn() {
  // Check if reset_token column exists
  const checkResetTokenColumnQuery = "SHOW COLUMNS FROM users LIKE 'reset_token'";
  
  connection.query(checkResetTokenColumnQuery, (err, results) => {
    if (err) {
      console.error('Error checking for reset_token column:', err);
      connection.end();
      return;
    }
    
    if (results.length === 0) {
      // Column doesn't exist, add it
      const addResetTokenColumnQuery = "ALTER TABLE users ADD COLUMN reset_token VARCHAR(255), ADD COLUMN reset_token_expires TIMESTAMP NULL";
      
      connection.query(addResetTokenColumnQuery, (err, result) => {
        if (err) {
          console.error('Error adding reset_token columns:', err);
        } else {
          console.log('reset_token columns added successfully');
        }
        
        // Continue with sample user creation
        createSampleUser();
      });
    } else {
      console.log('reset_token column already exists');
      // Continue with sample user creation
      createSampleUser();
    }
  });
}

function createSampleUser() {
  // Check if sample user already exists
  const checkUserExists = "SELECT COUNT(*) as count FROM users WHERE email = 'test@example.com'";
  
  connection.query(checkUserExists, (err, results) => {
    if (err) {
      console.error('Error checking for sample user:', err);
      connection.end();
      return;
    }
    
    if (results[0].count === 0) {
      // User doesn't exist, insert it
      const insertSampleUser = `
        INSERT INTO users (name, email, password, is_verified) 
        VALUES ('Test User', 'test@example.com', 'password123', 1)
      `;
      
      connection.query(insertSampleUser, (err, result) => {
        if (err) {
          console.error('Error inserting sample user:', err);
          connection.end();
          return;
        }
        console.log('Sample user created successfully');
        console.log('Database initialization complete!');
        connection.end();
      });
    } else {
      console.log('Sample user already exists');
      console.log('Database initialization complete!');
      connection.end();
    }
  });
}