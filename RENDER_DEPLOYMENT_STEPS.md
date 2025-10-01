# Render Deployment Steps for Campus Bridge LMS

## Prerequisites
1. A Render account (https://render.com)
2. A MySQL database provider (e.g., PlanetScale, Railway, or any external MySQL provider)
3. Your database connection details

## Deployment Steps

### 1. Fork the Repository
First, fork the Campus Bridge repository to your GitHub account.

### 2. Create a MySQL Database
You'll need an external MySQL database since Render's free tier doesn't include persistent databases.

Option 1: PlanetScale (Recommended for free tier)
1. Go to https://planetscale.com
2. Create a free account
3. Create a new database named "lms"
4. Get your connection details:
   - Host
   - Username
   - Password
   - Database name

Option 2: Railway (Alternative)
1. Go to https://railway.app
2. Create a new project
3. Add a MySQL database
4. Get your connection details

### 3. Deploy to Render
1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub account
4. Select your forked Campus Bridge repository
5. Fill in the form:
   - Name: campus-bridge-lms
   - Region: Choose the closest to your users
   - Branch: main
   - Root Directory: Leave empty
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

### 4. Set Environment Variables
In the "Environment Variables" section, add these variables:

```
NODE_ENV=production
MYSQL_HOST=your-database-host
MYSQL_PORT=3306
MYSQL_USER=your-database-username
MYSQL_PASSWORD=your-database-password
MYSQL_DATABASE=lms
EMAIL_SERVICE=Gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
APP_URL=https://campus-bridge-lms.onrender.com
```

Replace the values with your actual database and email configuration.

### 5. Initialize Database Tables
After deployment is complete:

1. Go to your Render dashboard
2. Click on your "campus-bridge-lms" service
3. Go to the "Shell" tab
4. Run this command to initialize the database tables:
   ```
   npm run init-render-db
   ```

### 6. Test the Application
1. Visit your application URL (https://campus-bridge-lms.onrender.com)
2. Try to register a new user
3. Check your email for the verification link
4. Log in with your credentials

## Troubleshooting

### Common Issues

1. **Bad Gateway Error**
   - Check that all environment variables are correctly set
   - Verify database connection details
   - Run the database initialization script

2. **Database Connection Failed**
   - Double-check your MySQL host, port, username, password, and database name
   - Ensure your database provider allows external connections
   - For PlanetScale, make sure you're using the connect details, not the internal details

3. **Email Not Working**
   - Verify your Gmail app password is correct
   - Check that EMAIL_SERVICE is set to "Gmail"
   - Make sure EMAIL_FROM matches EMAIL_USER

### Checking Logs
1. In your Render dashboard
2. Click on your service
3. Go to the "Logs" tab
4. Look for error messages

### Checking Database Connection
1. In your Render dashboard
2. Click on your service
3. Go to the "Shell" tab
4. Run:
   ```
   curl http://localhost:3000/api/db/status
   ```

## Need Help?
If you continue to experience issues:
1. Check the logs in your Render dashboard
2. Verify all environment variables are set correctly
3. Ensure your database provider allows connections from Render
4. Contact support if needed