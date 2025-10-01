# Database Connection Troubleshooting Guide

This guide will help you troubleshoot database connection issues with your Campus Bridge LMS deployment on Render.

## Common Issues and Solutions

### 1. Environment Variables Not Set

**Problem**: Database connection fails because environment variables are not configured.

**Solution**:
1. Go to your Render dashboard
2. Navigate to your web service
3. Go to "Environment Variables" section
4. Add the following variables:
   ```
   MYSQL_HOST=your-database-host
   MYSQL_PORT=3306
   MYSQL_USER=your-database-username
   MYSQL_PASSWORD=your-database-password
   MYSQL_DATABASE=lms
   ```

### 2. Using PlanetScale Database

**Problem**: PlanetScale requires specific configuration.

**Solution**:
1. In your PlanetScale dashboard:
   - Create a new password for your database
   - Copy the host, username, and password
2. Set these environment variables in Render:
   ```
   MYSQL_HOST=aws.connect.psdb.cloud
   MYSQL_PORT=3306
   MYSQL_USER=your-planetscale-username
   MYSQL_PASSWORD=your-planetscale-password
   MYSQL_DATABASE=your-planetscale-database-name
   ```

### 3. Database Not Initialized

**Problem**: The required tables don't exist in your database.

**Solution**:
1. Connect to your database using a MySQL client
2. Run the initialization script:
   ```sql
   CREATE DATABASE IF NOT EXISTS lms;
   
   USE lms;
   
   CREATE TABLE IF NOT EXISTS learning_resources (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     file_path VARCHAR(255) NOT NULL
   );
   
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     is_verified TINYINT(1) DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 4. Network/Access Issues

**Problem**: Database is not accessible from Render.

**Solution**:
- For PlanetScale: Ensure you're using the correct connection details
- For other providers: Make sure the database accepts connections from external IPs
- Check firewall settings if hosting your own database

### 5. Incorrect Credentials

**Problem**: Database username or password is incorrect.

**Solution**:
1. Double-check your database credentials
2. Make sure you're using the correct database name
3. Test the connection locally with the same credentials

## Authentication-Specific Issues

### Email Configuration Issues

**Problem**: Email verification is not working, preventing user login.

**Solution**:
1. Set these environment variables in Render:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   APP_URL=https://your-app-name.onrender.com
   ```
2. For Gmail, you need to generate an App Password:
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Factor Authentication
   - Generate an App Password for "Mail"

### User Verification Issues

**Problem**: Users can register but cannot login because they haven't verified their email.

**Solution**:
1. Ensure email configuration is correct (see above)
2. For development/testing, you can manually verify users by running:
   ```sql
   UPDATE users SET is_verified = 1 WHERE email = 'user@example.com';
   ```
3. Or temporarily disable email verification by modifying the login query in server.js

### Database Schema Issues

**Problem**: Missing columns or incorrect table structure.

**Solution**:
1. Verify your users table has all required columns:
   ```sql
   DESCRIBE users;
   ```
2. Ensure it has these columns:
   - id (INT, AUTO_INCREMENT, PRIMARY KEY)
   - name (VARCHAR)
   - email (VARCHAR, UNIQUE)
   - password (VARCHAR)
   - is_verified (TINYINT, DEFAULT 0)
   - created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## How to Use the Database Status Page

After deployment, visit:
```
https://your-app-name.onrender.com/db-status.html
```

Use the buttons to:
1. **Check Connection**: Test basic database connectivity
2. **Check Tables**: Verify that required tables exist
3. **Check Users**: See how many users are registered

## Authentication Troubleshooting Page

For specific authentication issues, visit:
```
https://your-app-name.onrender.com/auth-troubleshooting.html
```

This page provides step-by-step guidance for resolving registration and login problems.

## Debugging Steps

### Step 1: Check Environment Variables
Visit the database status page and click "Check Connection". If it fails, the error message will show the connection details being used.

### Step 2: Verify Database Provider Settings
- PlanetScale: Check connection strings in the dashboard
- Railway: Verify database credentials
- Self-hosted: Ensure the database is accessible from external IPs

### Step 3: Initialize Database Tables
If tables don't exist, connect to your database and run the SQL commands from the initialization script.

### Step 4: Check Render Logs
1. Go to your Render dashboard
2. Navigate to your web service
3. Check the "Logs" tab for any database-related error messages

## Testing Database Connection Locally

To test your database connection locally:

1. Create a [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env.example) file with your database credentials:
   ```
   MYSQL_HOST=your-host
   MYSQL_USER=your-username
   MYSQL_PASSWORD=your-password
   MYSQL_DATABASE=lms
   ```

2. Run the application:
   ```bash
   npm start
   ```

3. Visit http://localhost:3000/db-status.html to test the connection

## Support

If you continue to have issues:
1. Check the Render logs for detailed error messages
2. Verify all environment variables are correctly set
3. Contact your database provider for connection details
4. Reach out to: connect@campusbridge.io