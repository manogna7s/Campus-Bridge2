# Campus Bridge Email Setup Guide

This guide will help you properly configure email functionality for password resets and other email features in Campus Bridge.

## Current Status

Your application currently has email functionality implemented but is using placeholder values in the [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=youremail@gmail.com
```

## How the Fallback System Works

Even with placeholder values, the password reset functionality still works:
1. When a user requests a password reset, the system generates a reset token
2. Since email is not properly configured, the system displays the reset link directly
3. Users can click this link to reset their password without receiving an email

This ensures functionality is always available, even when email is not configured.

## Setting Up Real Email Sending

To enable actual email sending, follow these steps:

### Step 1: Configure Gmail (Recommended)

If you're using Gmail:

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Navigate to Security > 2-Step Verification
   - Turn on 2-Step Verification

2. **Generate an App Password**
   - In the same Security section, scroll down to "App passwords"
   - Generate a new app password for "Mail"
   - Copy the 16-character password (no spaces)

### Step 2: Update Your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) File

Replace the placeholder values with your actual credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=youractualgmailaddress@gmail.com
EMAIL_PASS=th1s1s4n4ppp4ssw0rd
EMAIL_FROM=youractualgmailaddress@gmail.com
```

Important notes:
- Use your actual Gmail address (not the placeholder)
- Use the App Password (not your regular Gmail password)
- The EMAIL_FROM should typically be the same as EMAIL_USER

### Step 3: Restart Your Application

After updating the [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:
1. Stop your server (Ctrl+C)
2. Start your server again (`npm start` or `node server.js`)

## Testing Email Configuration

To test if your email configuration is working:

1. Run the test script:
   ```bash
   node test-email.js
   ```

2. Check your email for a test message

## Troubleshooting Common Issues

### "Username and Password not accepted" Error

This is the most common error and usually means:

1. **Using regular password instead of App Password**
   - Solution: Generate and use an App Password

2. **2-Factor Authentication not enabled**
   - Solution: Enable 2FA on your Google account

3. **Incorrect App Password**
   - Solution: Generate a new App Password

### "Invalid login" or Authentication Errors

1. **Check credentials**
   - Verify EMAIL_USER is your complete Gmail address
   - Verify EMAIL_PASS is the App Password (16 characters)

2. **Gmail security settings**
   - Less secure app access may need to be enabled (though not recommended)
   - Consider using a dedicated email service for production

## Alternative Email Services

You can use other email services by changing the EMAIL_SERVICE value:

```env
# For Outlook/Hotmail
EMAIL_SERVICE=hotmail
EMAIL_USER=youraddress@outlook.com
EMAIL_PASS=yourpassword
EMAIL_FROM=youraddress@outlook.com

# For Yahoo
EMAIL_SERVICE=yahoo
EMAIL_USER=youraddress@yahoo.com
EMAIL_PASS=yourpassword
EMAIL_FROM=youraddress@yahoo.com
```

## Security Best Practices

1. **Never commit [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) files to version control**
   - The [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file is already in [.gitignore](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.gitignore)

2. **Use App Passwords**
   - More secure than regular passwords
   - Can be revoked without changing your main password

3. **Environment-specific configurations**
   - Use different [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) files for development, staging, and production

## How Password Reset Works

1. User requests password reset on forgot-password.html
2. Server generates secure token and expiration (1 hour)
3. If email configured: sends email with reset link
4. If email not configured: displays reset link directly
5. User clicks link to access reset-password.html
6. User enters new password
7. Server validates token and updates password
8. Token is cleared after successful reset

## Need Help?

If you continue to have issues:

1. Double-check all values in [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file
2. Verify App Password was generated correctly
3. Ensure 2FA is enabled
4. Test with the test-email.js script