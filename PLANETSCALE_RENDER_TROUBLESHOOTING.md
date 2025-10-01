# PlanetScale & Render Troubleshooting Guide

This guide helps you resolve common issues when deploying Campus Bridge LMS with PlanetScale on Render.

## Common Issues and Solutions

### 1. "Bad Gateway" Error

**Cause**: Incorrect database configuration or missing environment variables.

**Solutions**:
1. Verify all environment variables are set correctly in Render:
   - MYSQL_HOST
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_DATABASE
2. Check that you're using PlanetScale "connect" credentials, not internal ones
3. Ensure you generated a password for your PlanetScale user
4. Run database initialization: `npm run init-render-db` in Render shell

### 2. "Database Connection Failed" Error

**Cause**: Incorrect connection details or network issues.

**Solutions**:
1. Double-check your PlanetScale connection details:
   - Go to PlanetScale dashboard
   - Select your database
   - Click "Connect"
   - Use the "connect" credentials, not "internal"
2. Verify your password is correct (passwords are only shown once)
3. Check that your database region matches your expectations
4. Ensure your PlanetScale database allows connections from Render

### 3. "Access Denied" for Database

**Cause**: Incorrect username or password.

**Solutions**:
1. Generate a new password in PlanetScale:
   - Go to your database in PlanetScale
   - Click "Connect"
   - Click "New password"
   - Copy the new password
   - Update the MYSQL_PASSWORD variable in Render
2. Verify your username is correct
3. Make sure you're using the "connect" username, not the "internal" one

### 4. Email Not Working

**Cause**: Incorrect Gmail configuration.

**Solutions**:
1. Ensure you're using an App Password, not your regular Gmail password:
   - Enable 2-factor authentication on your Google account
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this as your EMAIL_PASS
2. Check that EMAIL_SERVICE is set to "Gmail"
3. Verify EMAIL_FROM matches EMAIL_USER

### 5. Application Not Starting

**Cause**: Missing or incorrect environment variables.

**Solutions**:
1. Check Render logs for specific error messages
2. Verify all required environment variables are set:
   - NODE_ENV
   - MYSQL_HOST
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_DATABASE
   - EMAIL_SERVICE
   - EMAIL_USER
   - EMAIL_PASS
   - EMAIL_FROM
   - APP_URL
3. Ensure APP_URL matches your actual Render URL

### 6. Database Tables Not Created

**Cause**: Database initialization script not run.

**Solutions**:
1. Run the initialization script in Render shell:
   - Go to your Render service
   - Click "Shell"
   - Run: `npm run init-render-db`
2. Check the output for any error messages
3. Verify your database connection details are correct

## How to Check Logs in Render

1. Go to your Render dashboard
2. Click on your "campus-bridge-lms" service
3. Click "Logs" in the sidebar
4. Look for error messages, especially:
   - Database connection errors
   - Environment variable issues
   - Startup errors

## How to Test Database Connection

1. In Render, go to your service
2. Click "Shell"
3. Run this command:
   ```bash
   curl http://localhost:3000/api/db/status
   ```
4. You should see a response indicating database status

## How to Run Database Initialization

1. In Render, go to your service
2. Click "Shell"
3. Run:
   ```bash
   npm run init-render-db
   ```
4. Check the output for success messages

## PlanetScale Specific Issues

### "SSL Connection Required"

**Solution**: This is already handled by our application code. No additional configuration needed.

### "Too Many Connections"

**Solution**: 
1. This can happen during development if connections aren't properly closed
2. Restart your Render service to clear connections
3. Check the PlanetScale dashboard for connection metrics

### "Branch Not Found"

**Solution**:
1. Ensure you're connecting to the correct database branch (usually "main")
2. Check your database name is correct

## Render Specific Issues

### Environment Variables Not Taking Effect

**Solution**:
1. After changing environment variables in Render:
   - Click "Save Changes"
   - Click "Deploy" to restart the application
2. Note that Render doesn't use .env files directly

### Build Failures

**Solutions**:
1. Check the build logs for specific error messages
2. Ensure all dependencies are in package.json
3. Verify the build command is correct: `npm install`

### Deployment Taking Too Long

**Solutions**:
1. Check if your application is listening on the correct port:
   - Should use `process.env.PORT` or default to 3000
2. Ensure your start command is correct: `npm start`

## Need More Help?

1. Check the PlanetScale documentation: https://docs.planetscale.com
2. Check the Render documentation: https://render.com/docs
3. Review the specific guides:
   - [PLANETSCALE_SETUP_GUIDE.md](PLANETSCALE_SETUP_GUIDE.md)
   - [RENDER_DEPLOYMENT_STEPS.md](RENDER_DEPLOYMENT_STEPS.md)
   - [RENDER_ENV_VARIABLES.md](RENDER_ENV_VARIABLES.md)
4. Contact support through the respective platforms