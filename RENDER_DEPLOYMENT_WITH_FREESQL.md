# Render Deployment Guide for Campus Bridge with FreeSQLDatabase.com

This guide will help you deploy your Campus Bridge LMS application to Render using your FreeSQLDatabase.com MySQL database.

## Prerequisites

1. A Render account (https://render.com)
2. A GitHub account
3. Your FreeSQLDatabase.com credentials (already configured)

## Deployment Steps

### 1. Fork the Repository
First, fork the Campus Bridge repository to your GitHub account:
1. Go to your Campus Bridge repository on GitHub
2. Click the "Fork" button in the top right
3. Select your GitHub account as the destination

### 2. Connect Render to GitHub
1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub account when prompted
4. Select your forked Campus Bridge repository

### 3. Configure the Web Service
Fill in the form with these values:
- **Name**: campus-bridge-lms
- **Region**: Choose the closest to your users
- **Branch**: main
- **Root Directory**: Leave empty
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Set Environment Variables
This is the most critical step. In the "Environment Variables" section, add these variables:

```
NODE_ENV=production
MYSQL_HOST=sql12.freesqldatabase.com
MYSQL_PORT=3306
MYSQL_USER=sql12800866
MYSQL_PASSWORD=MTDTiriNyU
MYSQL_DATABASE=sql12800866
MYSQL_SSL=false
EMAIL_SERVICE=Gmail
EMAIL_USER=manognasamayam@gmail.com
EMAIL_PASS=tpfqytthmezrpdwc
EMAIL_FROM=manognasamayam@gmail.com
APP_URL=https://campus-bridge-lms.onrender.com
```

**Important Notes:**
- `MYSQL_SSL=false` is required for FreeSQLDatabase.com
- Make sure all your FreeSQLDatabase.com credentials match exactly
- The email credentials should work with Gmail's App Passwords

### 5. Deploy the Application
1. Click "Create Web Service"
2. Wait for the build and deployment to complete (this can take 5-10 minutes)
3. Watch the logs for any errors

### 6. Initialize Database Tables
After deployment is complete:
1. Go to your Render service dashboard
2. Click the "Shell" tab
3. Run this command to initialize the database tables:
   ```
   npm run init-render-db
   ```

### 7. Test the Application
1. Visit your application URL: https://campus-bridge-lms.onrender.com
2. Try to register a new user
3. Check your email for the verification link
4. Click the verification link to confirm your email
5. Log in with your credentials

## Troubleshooting

### Common Issues and Solutions

1. **Bad Gateway Error**
   - Verify all environment variables are set correctly
   - Check that `MYSQL_SSL=false` is set
   - Ensure FreeSQLDatabase.com credentials are correct
   - Run the database initialization script

2. **Database Connection Failed**
   - Double-check your FreeSQLDatabase.com credentials
   - Ensure `MYSQL_SSL=false` is set
   - Verify the database is active (may need to log in to FreeSQLDatabase.com to wake it up)

3. **Email Not Working**
   - Verify your Gmail App Password is correct
   - Check that EMAIL_SERVICE is set to "Gmail"
   - Make sure EMAIL_FROM matches EMAIL_USER

4. **Application Not Starting**
   - Check Render logs for specific error messages
   - Ensure all required environment variables are set
   - Verify the start command is correct: `npm start`

### Checking Logs
1. In your Render dashboard
2. Click on your "campus-bridge-lms" service
3. Click "Logs" in the sidebar
4. Look for error messages, especially:
   - Database connection errors
   - Environment variable issues
   - Startup errors

### Testing Database Connection
1. In Render, go to your service
2. Click "Shell"
3. Run:
   ```
   curl http://localhost:3000/api/db/status
   ```

## Useful Render Commands

In the Render Shell:
- Test database status: `curl http://localhost:3000/api/db/status`
- Initialize database: `npm run init-render-db`
- Check users count: `curl http://localhost:3000/api/db/users/count`
- List tables: `curl http://localhost:3000/api/db/tables`

## Security Recommendations

1. **Change Your Database Password**
   - After confirming the deployment works, consider changing your FreeSQLDatabase.com password
   - Update the MYSQL_PASSWORD environment variable in Render

2. **Update Email Credentials**
   - Consider generating a new Gmail App Password
   - Update EMAIL_PASS in Render environment variables

## Need Help?

If you continue to experience issues:
1. Check all logs in your Render dashboard
2. Verify all environment variables are set correctly
3. Ensure your FreeSQLDatabase.com database allows external connections
4. Contact Render support through their dashboard

## Success Verification

When deployment is successful, you should be able to:
- Access the application at https://campus-bridge-lms.onrender.com
- Register a new user
- Receive email verification
- Log in with registered credentials
- Upload and view PDF files
- Access database status page at `/db-status.html`
- See database connection as successful