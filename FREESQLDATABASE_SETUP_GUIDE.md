# FreeSQLDatabase.com Setup Guide for Campus Bridge LMS

This guide will help you set up a MySQL database on FreeSQLDatabase.com as a completely free alternative for your Campus Bridge LMS application.

## Important Considerations

Before proceeding, please note these limitations of FreeSQLDatabase.com:
- **No SSL Support**: The free tier doesn't support SSL connections
- **Database Sleep**: Databases may go to sleep after inactivity
- **Limited Resources**: Restricted storage and connections
- **Backup Policy**: Limited or no backup guarantees
- **Uptime**: Not guaranteed for production use

This option is best for testing and development. For production applications, consider AWS RDS Free Tier or other paid options.

## Step 1: Create a FreeSQLDatabase.com Account

1. Go to [https://www.freesqldatabase.com](https://www.freesqldatabase.com)
2. Click "Free MySQL Database" or "Get Started"
3. Fill in the registration form:
   - Email address
   - Password
4. Check your email for verification link
5. Click the verification link to activate your account

## Step 2: Create Your Database

1. Log in to your FreeSQLDatabase.com account
2. You should see your database details on the dashboard
3. If no database is created automatically, look for a "Create Database" option

## Step 3: Get Connection Details

On your dashboard, you'll find:
- **Hostname/Server**: This is your MYSQL_HOST
- **Port**: Usually 3306 (MYSQL_PORT)
- **Username**: This is your MYSQL_USER
- **Password**: This is your MYSQL_PASSWORD
- **Database Name**: This is your MYSQL_DATABASE

## Step 4: Update Application Code for Non-SSL Connection

Since FreeSQLDatabase.com doesn't support SSL, we need to modify our database connection code to work without SSL.

### Update db.js file:

1. Open [db.js](file:///Users/madanthambisetty/Downloads/Campus-Bridge/db.js) in your project
2. Find the connection configuration section
3. Add `ssl: false` to the connection options

The updated connection section should look like this:

```javascript
// Use Render's environment variables or fallback to local settings
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.PLANETSCALE_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms',
  ssl: false, // Add this line for FreeSQLDatabase.com
  connectTimeout: 30000, // 30 seconds timeout
  acquireTimeout: 30000, // 30 seconds timeout
  timeout: 30000, // 30 seconds timeout
  reconnect: true, // Enable reconnection
  reconnectDelay: 2000, // 2 seconds delay between reconnection attempts
  reconnectDelayMax: 10000, // Maximum 10 seconds delay
  reconnectAttempts: 5 // Maximum reconnection attempts
});
```

## Step 5: Configure Environment Variables in Render

In your Render dashboard:
1. Go to your "campus-bridge-lms" service
2. Click "Environment" in the sidebar
3. Add these variables:
   - `MYSQL_HOST` - Your FreeSQLDatabase.com hostname
   - `MYSQL_PORT` - 3306 (or provided port)
   - `MYSQL_USER` - Your FreeSQLDatabase.com username
   - `MYSQL_PASSWORD` - Your FreeSQLDatabase.com password
   - `MYSQL_DATABASE` - Your database name
   - `MYSQL_SSL` - false

## Step 6: Initialize Database Tables

After deployment:
1. Go to your Render service dashboard
2. Click "Shell" tab
3. Run: `npm run init-render-db`

## Important Notes

1. **Connection Stability**: FreeSQLDatabase.com databases may be less stable than paid options
2. **Performance**: Expect slower performance compared to premium providers
3. **Sleeping Databases**: Database may go to sleep after periods of inactivity
4. **Data Safety**: Regularly backup important data as free providers have limited backup policies

## Troubleshooting

### Connection Issues
- Ensure you've added `ssl: false` to your database configuration
- Check that all connection details are correct
- Verify the database is active (may need to log in to wake it up)

### "Access Denied" Errors
- Double-check your username and password
- Some free providers require you to add IP addresses to an allowlist
- Try logging into the database directly using a MySQL client to verify credentials

### Database Sleeping
- This is normal behavior for free hosting providers
- The first request after sleep may be slow while the database wakes up
- Consider implementing retry logic in your application for production use

## Testing the Connection

You can test your connection locally by:
1. Updating your local [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file with FreeSQLDatabase.com credentials
2. Running `npm start` to test the connection

## Alternative Recommendations

If FreeSQLDatabase.com doesn't meet your needs, consider:
1. **AWS RDS Free Tier** - 750 hours/month of db.t2.micro for 12 months
2. **Google Cloud SQL** - $300 credit for 90 days
3. **Railway** - $5/month credit (usually sufficient for small apps)

## Need Help?

If you encounter any issues:
1. Check the FreeSQLDatabase.com FAQ or documentation
2. Verify your connection details are correct
3. Ensure you've updated the db.js file with `ssl: false`
4. Contact FreeSQLDatabase.com support if available