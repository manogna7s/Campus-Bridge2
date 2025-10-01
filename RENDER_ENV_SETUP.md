# Render Environment Variables Setup Guide

This guide will help you properly configure environment variables in Render for your Campus Bridge application, particularly for email functionality.

## Setting Environment Variables in Render Dashboard

1. Go to your Render dashboard (https://dashboard.render.com)
2. Navigate to your Campus Bridge web service
3. Click on "Environment Variables" in the settings section
4. Add the following environment variables:

| Key | Value | Description |
|-----|-------|-------------|
| EMAIL_SERVICE | Gmail | Email service provider |
| EMAIL_USER | manognasamayam@gmail.com | Your Gmail address |
| EMAIL_PASS | your-16-character-app-password | Your Gmail App Password |
| EMAIL_FROM | manognasamayam@gmail.com | Sender email address |

Based on your current .env file, you should use `manognasamayam@gmail.com` as your EMAIL_USER and EMAIL_FROM.

## Verifying Your Gmail App Password

1. Make sure you've enabled 2-Factor Authentication on your Google Account
2. Go to your Google Account settings
3. Navigate to Security > 2-Step Verification > App passwords
4. Generate a new App Password for "Mail"
5. Copy the 16-character password (without spaces)
6. Use this exact password in your EMAIL_PASS environment variable

For your account (`manognasamayam@gmail.com`), you'll need to:
1. Go to https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Select "Mail" as the app
4. Select your device (or select "Other" and enter "Render")
5. Click "Generate"
6. Copy the 16-character password

## Testing Email Functionality

After setting the environment variables:

1. Go to your Render service dashboard
2. Click "Manual Deploy" > "Clear build cache & deploy"
3. Wait for deployment to complete
4. Test the registration and password reset functionality

You can also test your email configuration by visiting:
`https://campus-bridge-m.onrender.com/api/test-email-config`

This endpoint will show you if your environment variables are properly set.

## Troubleshooting

If emails still aren't working:

1. Check that all environment variables are correctly set (no extra spaces)
2. Verify your App Password hasn't been revoked
3. Ensure your Gmail account allows less secure app access (if using older accounts)
4. Check Render logs for any error messages

To check logs in Render:
1. Go to your service dashboard
2. Click on "Logs" tab
3. Look for any error messages related to email sending

## Important Notes

- Render does NOT use .env files directly
- Environment variables set in the dashboard override any values in .env files
- Never commit actual credentials to your repository
- App Passwords are case-sensitive and must be exactly 16 characters
- After setting environment variables, you must redeploy your application for changes to take effect