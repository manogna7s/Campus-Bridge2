# Render Deployment Checklist for Campus Bridge with FreeSQLDatabase.com

Follow this checklist to successfully deploy Campus Bridge LMS on Render with your FreeSQLDatabase.com MySQL database.

## Pre-Deployment Verification

### [ ] Verify Local Setup
- [ ] Application runs locally with FreeSQLDatabase.com credentials
- [ ] Database connection test passes
- [ ] Database tables initialized successfully
- [ ] User registration and login work locally

### [ ] Verify Credentials
- [ ] FreeSQLDatabase.com credentials confirmed:
  - [ ] Host: sql12.freesqldatabase.com
  - [ ] Port: 3306
  - [ ] User: sql12800866
  - [ ] Password: MTDTiriNyU
  - [ ] Database: sql12800866
- [ ] Gmail App Password confirmed: tpfqytthmezrpdwc
- [ ] Consider changing passwords for security after deployment

## Render Deployment Steps

### [ ] Fork Repository
- [ ] Fork Campus Bridge repository to your GitHub account

### [ ] Create Render Service
- [ ] Log in to Render
- [ ] Click "New" → "Web Service"
- [ ] Connect GitHub account
- [ ] Select forked Campus Bridge repository
- [ ] Configure service:
  - Name: campus-bridge-lms
  - Region: Choose closest to your users
  - Branch: main
  - Root Directory: Leave empty
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`

### [ ] Configure Environment Variables
Set these variables in Render dashboard (EXACTLY as shown):
- [ ] NODE_ENV = production
- [ ] MYSQL_HOST = sql12.freesqldatabase.com
- [ ] MYSQL_PORT = 3306
- [ ] MYSQL_USER = sql12800866
- [ ] MYSQL_PASSWORD = MTDTiriNyU
- [ ] MYSQL_DATABASE = sql12800866
- [ ] MYSQL_SSL = false (CRITICAL for FreeSQLDatabase.com)
- [ ] EMAIL_SERVICE = Gmail
- [ ] EMAIL_USER = manognasamayam@gmail.com
- [ ] EMAIL_PASS = tpfqytthmezrpdwc
- [ ] EMAIL_FROM = manognasamayam@gmail.com
- [ ] APP_URL = https://campus-bridge-lms.onrender.com

### [ ] Deploy Application
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (5-10 minutes)
- [ ] Check logs for any errors

## Post-Deployment Steps

### [ ] Initialize Database Tables
- [ ] Go to Render service dashboard
- [ ] Click "Shell" tab
- [ ] Run: `npm run init-render-db`
- [ ] Check output for success messages

### [ ] Test Application Functionality
- [ ] Visit https://campus-bridge-lms.onrender.com
- [ ] Register a new user
- [ ] Check email for verification link
- [ ] Verify email and log in
- [ ] Test PDF upload functionality

### [ ] Verify Database Connection
- [ ] Go to `/db-status.html` on your Render site
- [ ] Confirm database is connected
- [ ] Check `/api/db/users/count` endpoint
- [ ] Check `/api/db/tables` endpoint

## Troubleshooting Quick Reference

If you encounter issues:

1. **Bad Gateway Error**:
   - [ ] Check all environment variables
   - [ ] Verify FreeSQLDatabase.com credentials
   - [ ] Ensure MYSQL_SSL=false is set
   - [ ] Run database initialization

2. **Database Connection Failed**:
   - [ ] Double-check FreeSQLDatabase.com connection details
   - [ ] Ensure MYSQL_SSL=false is set
   - [ ] Verify database is active (log in to FreeSQLDatabase.com)

3. **Email Not Working**:
   - [ ] Confirm Gmail App Password is correct
   - [ ] Check EMAIL_SERVICE is set to "Gmail"
   - [ ] Verify EMAIL_FROM matches EMAIL_USER

4. **Application Not Starting**:
   - [ ] Check Render logs for error messages
   - [ ] Verify all required environment variables are set
   - [ ] Ensure start command is correct

## Success Criteria

When deployment is successful, you should be able to:
- [ ] Access the application at https://campus-bridge-lms.onrender.com
- [ ] Register a new user
- [ ] Receive email verification
- [ ] Log in with registered credentials
- [ ] Upload and view PDF files
- [ ] Access database status page
- [ ] See database connection as successful

## Post-Deployment Security Steps

- [ ] Change FreeSQLDatabase.com password and update in Render
- [ ] Generate new Gmail App Password and update in Render
- [ ] Monitor application logs for any unusual activity