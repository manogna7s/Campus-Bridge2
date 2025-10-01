# Campus Bridge LMS Deployment Checklist

Follow this checklist to successfully deploy Campus Bridge LMS on Render with a MySQL database provider.

## Phase 1: Preparation

### [ ] Choose and Set up MySQL Database Provider
Select one of these options:

**Option 1: FreeSQLDatabase.com** (Completely free)
- [ ] Create FreeSQLDatabase.com account
- [ ] Get connection details
- [ ] Save credentials securely
- [ ] Note: Set MYSQL_SSL=false in Render environment variables
- [ ] Guide: [FREESQLDATABASE_SETUP_GUIDE.md](FREESQLDATABASE_SETUP_GUIDE.md)

**Option 2: PlanetScale** (Free tier with limitations)
- [ ] Create PlanetScale account
- [ ] Create database named "campus-bridge-lms"
- [ ] Get connection details (hostname, username, password, database name)
- [ ] Save credentials securely
- [ ] Guide: [PLANETSCALE_SETUP_GUIDE.md](PLANETSCALE_SETUP_GUIDE.md)

**Option 3: Railway** (Credit-based free option)
- [ ] Create Railway account
- [ ] Create project
- [ ] Add MySQL database
- [ ] Get connection details
- [ ] Save credentials securely
- [ ] Guide: [RAILWAY_SETUP_GUIDE.md](RAILWAY_SETUP_GUIDE.md)

### [ ] Prepare Email Configuration
- [ ] Enable 2-factor authentication on Gmail account
- [ ] Generate Gmail App Password
- [ ] Test email credentials locally (optional)

## Phase 2: Render Deployment

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
Set these variables in Render dashboard:
- [ ] NODE_ENV = production
- [ ] MYSQL_HOST = (your MySQL hostname)
- [ ] MYSQL_PORT = 3306 (or your provider's port)
- [ ] MYSQL_USER = (your MySQL username)
- [ ] MYSQL_PASSWORD = (your MySQL password)
- [ ] MYSQL_DATABASE = (your database name)
- [ ] MYSQL_SSL = false (ONLY if using FreeSQLDatabase.com, otherwise omit)
- [ ] EMAIL_SERVICE = Gmail
- [ ] EMAIL_USER = (your Gmail address)
- [ ] EMAIL_PASS = (your Gmail app password)
- [ ] EMAIL_FROM = (your Gmail address)
- [ ] APP_URL = https://campus-bridge-lms.onrender.com

### [ ] Deploy Application
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (5-10 minutes)
- [ ] Check logs for any errors

## Phase 3: Database Initialization

### [ ] Initialize Database Tables
- [ ] Go to Render service dashboard
- [ ] Click "Shell" tab
- [ ] Run: `npm run init-render-db`
- [ ] Check output for success messages

## Phase 4: Testing

### [ ] Test Application
- [ ] Visit your Render URL
- [ ] Register a new user
- [ ] Check email for verification link
- [ ] Verify email and log in
- [ ] Test PDF upload functionality

### [ ] Verify Database Connection
- [ ] Go to `/db-status.html` on your Render site
- [ ] Confirm database is connected
- [ ] Check `/api/db/users/count` endpoint
- [ ] Check `/api/db/tables` endpoint

## Phase 5: Monitoring

### [ ] Set Up Monitoring (Optional)
- [ ] Configure uptime monitoring
- [ ] Set up error tracking
- [ ] Configure alerts for critical issues

## Troubleshooting Quick Reference

If you encounter issues:

1. **Bad Gateway Error**:
   - Check all environment variables
   - Verify MySQL credentials
   - Run database initialization

2. **Database Connection Failed**:
   - Double-check MySQL connection details
   - Ensure password is correct
   - For FreeSQLDatabase.com, ensure MYSQL_SSL=false is set

3. **Email Not Working**:
   - Confirm Gmail App Password is correct
   - Check EMAIL_SERVICE is set to "Gmail"
   - Verify EMAIL_FROM matches EMAIL_USER

4. **Application Not Starting**:
   - Check Render logs for error messages
   - Verify all required environment variables are set
   - Ensure start command is correct

## Useful Commands

In Render Shell:
- Test database status: `curl http://localhost:3000/api/db/status`
- Initialize database: `npm run init-render-db`
- Check users count: `curl http://localhost:3000/api/db/users/count`
- List tables: `curl http://localhost:3000/api/db/tables`

## Documentation References

- [FREESQLDATABASE_SETUP_GUIDE.md](FREESQLDATABASE_SETUP_GUIDE.md) - FreeSQLDatabase.com setup
- [PLANETSCALE_SETUP_GUIDE.md](PLANETSCALE_SETUP_GUIDE.md) - Detailed PlanetScale setup
- [RAILWAY_SETUP_GUIDE.md](RAILWAY_SETUP_GUIDE.md) - Railway setup guide
- [RENDER_DEPLOYMENT_STEPS.md](RENDER_DEPLOYMENT_STEPS.md) - Complete Render deployment guide
- [RENDER_ENV_VARIABLES.md](RENDER_ENV_VARIABLES.md) - Environment variable configuration
- [PLANETSCALE_RENDER_TROUBLESHOOTING.md](PLANETSCALE_RENDER_TROUBLESHOOTING.md) - Issue resolution guide

## Success Criteria

When deployment is successful, you should be able to:
- [ ] Access the application at your Render URL
- [ ] Register a new user
- [ ] Receive email verification
- [ ] Log in with registered credentials
- [ ] Upload and view PDF files
- [ ] Access database status page
- [ ] See database connection as successful

## Need Help?

If you're still experiencing issues:
1. Check all logs in Render dashboard
2. Verify all environment variables are set correctly
3. Ensure your MySQL database allows external connections
4. Contact support through Render or your MySQL provider's dashboards