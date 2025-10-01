# PlanetScale Setup Guide for Campus Bridge LMS

This guide will help you set up a PlanetScale database for your Campus Bridge LMS application, which is required for deployment on Render.

## Prerequisites

1. A GitHub account (for connecting to Render later)
2. A Gmail or Google account (for PlanetScale signup)

## Step 1: Create a PlanetScale Account

1. Go to [https://planetscale.com](https://planetscale.com)
2. Click "Start for free" or "Get started"
3. Sign up using your Google account or email
4. Verify your email address if prompted

## Step 2: Create Your Database

1. After logging in to PlanetScale, click "Create a database"
2. Fill in the form:
   - **Database name**: `campus-bridge-lms` (or any name you prefer)
   - **Region**: Choose the region closest to your users (e.g., AWS us-east-1 for East Coast US)
3. Click "Create database"

## Step 3: Get Connection Details

1. After your database is created, you'll be taken to the database dashboard
2. Click on the "Connect" button at the top
3. Select "MySQL" as the connection method
4. You'll see the connection details:
   - **Hostname**: This is your MYSQL_HOST
   - **Username**: This is your MYSQL_USER
   - **Password**: Click "New password" to generate a password - this is your MYSQL_PASSWORD
   - **Database name**: This is your MYSQL_DATABASE (should match your database name)

## Step 4: Save Your Credentials

Save these credentials in a secure location as you'll need them for Render deployment:
- MYSQL_HOST
- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_DATABASE

## Step 5: Test Connection (Optional)

You can test the connection using the command line:
```bash
mysql -h [HOST] -u [USERNAME] -p[PLAINTEXT_PASSWORD] [DATABASE_NAME]
```

## Important Notes

1. **Password Security**: PlanetScale passwords are only shown once for security. If you lose it, you'll need to generate a new one.

2. **Connection Limits**: The free tier has some limitations which should be sufficient for development and small production loads.

3. **SSL Connection**: PlanetScale requires SSL connections, which is automatically handled by our application code.

## Next Steps

After setting up PlanetScale:
1. Proceed with Render deployment
2. Use the PlanetScale credentials as your environment variables in Render:
   - MYSQL_HOST
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_DATABASE

## Troubleshooting

### Connection Issues
- Ensure you're using the "connect" credentials, not the internal ones
- Check that you've created a password for your user
- Verify the region is correct

### "Access Denied" Errors
- Double-check your username and password
- Generate a new password if needed
- Ensure your database name is correct

### SSL Issues
- Our application code already handles SSL connections to PlanetScale
- No additional configuration needed

## Need Help?

If you encounter any issues:
1. Check the PlanetScale documentation: https://docs.planetscale.com
2. Visit the PlanetScale Discord community: https://discord.gg/planetscale
3. Contact PlanetScale support through the dashboard