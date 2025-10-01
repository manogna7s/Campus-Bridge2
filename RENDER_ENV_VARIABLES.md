# Render Environment Variables for Campus Bridge LMS

After setting up your MySQL database, you'll need to configure these environment variables in your Render dashboard.

## How to Set Environment Variables in Render

1. Go to your Render dashboard
2. Click on your "campus-bridge-lms" service
3. Click "Environment" in the sidebar
4. Add each variable below as a key-value pair
5. Click "Save Changes" then "Deploy" to apply

## Required Environment Variables

| Key | Value | Description |
|-----|-------|-------------|
| NODE_ENV | production | Sets the application to production mode |
| MYSQL_HOST | your-mysql-host | From your MySQL provider connection details |
| MYSQL_PORT | 3306 | Standard MySQL port (default) |
| MYSQL_USER | your-mysql-username | From your MySQL provider connection details |
| MYSQL_PASSWORD | your-mysql-password | Generated password from your MySQL provider |
| MYSQL_DATABASE | your-database-name | Your MySQL database name |
| MYSQL_SSL | false | ONLY set this to "false" if using FreeSQLDatabase.com |
| EMAIL_SERVICE | Gmail | Email service provider |
| EMAIL_USER | your-email@gmail.com | Your Gmail address |
| EMAIL_PASS | your-app-password | Gmail app password (not your regular password) |
| EMAIL_FROM | your-email@gmail.com | Sender email address |
| APP_URL | https://campus-bridge-lms.onrender.com | Your Render application URL |

## How to Get FreeSQLDatabase.com Values

1. Log in to FreeSQLDatabase.com dashboard
2. Find your database connection details:
   - Hostname → MYSQL_HOST
   - Username → MYSQL_USER
   - Password → MYSQL_PASSWORD (may need to generate)
   - Database name → MYSQL_DATABASE

## Email Configuration

For Gmail to work:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this as your EMAIL_PASS

## After Setting Variables

1. Click "Save Changes" in Render
2. Render will automatically redeploy your application
3. After deployment, initialize the database:
   - Go to your service dashboard
   - Click "Shell"
   - Run: `npm run init-render-db`

## Verification

After deployment, you can verify your setup:
1. Visit your application URL
2. Try to register a new user
3. Check your email for verification
4. Log in with your credentials