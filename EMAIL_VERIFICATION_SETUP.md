# Campus Bridge Email Verification Setup

This guide will help you configure email verification so that users receive verification emails when they register.

## Current Status

Your application currently has placeholder values in the [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:
```env
EMAIL_USER=your-real-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
```

This means the email verification system is not active.

## How Email Verification Works

1. User registers with name, email, and password
2. System creates user account with `is_verified = 0`
3. System generates a unique verification token
4. System sends verification email with link containing token
5. User clicks link in email
6. System verifies token and sets `is_verified = 1`
7. User can now log in

## Setting Up Real Email Sending

### Step 1: Generate a Gmail App Password (Recommended for Gmail users)

If you're using Gmail:

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Click on "Security" in the left sidebar
   - Under "Signing in to Google," click on "2-Step Verification"
   - Follow the prompts to set up 2FA

2. **Generate an App Password**
   - In the same "Security" section, scroll down to "App passwords"
   - If you can't see this option, make sure 2FA is enabled
   - Click on "App passwords"
   - Select "Mail" as the app
   - Select "Other (Custom name)" and type "Campus Bridge"
   - Click "Generate"
   - Copy the 16-character password (without spaces)

### Step 2: Update Your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) File

Replace the placeholder values with your actual credentials:

```env
# Email Configuration
# For Gmail, you need to generate an App Password: https://myaccount.google.com/apppasswords
EMAIL_SERVICE=gmail
EMAIL_USER=your-actual-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=your-actual-gmail-address@gmail.com
```

Example with real values:
```env
# Email Configuration
# For Gmail, you need to generate an App Password: https://myaccount.google.com/apppasswords
EMAIL_SERVICE=gmail
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcd1234efgh5678
EMAIL_FROM=john.doe@gmail.com
```

### Step 3: Restart Your Application

After updating the [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:
1. Stop your server (Ctrl+C)
2. Start your server again:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

## Testing Email Verification

1. Go to the registration page
2. Fill in the registration form with a real email address
3. Submit the form
4. Check the email address for a verification email
5. Click the verification link in the email
6. You should be redirected to the login page with a success message
7. Try to log in with your new account

## Troubleshooting

### "Username and Password not accepted" Error

This is the most common error and usually means:

1. **Using regular password instead of App Password**
   - Solution: Generate and use an App Password

2. **2-Factor Authentication not enabled**
   - Solution: Enable 2FA on your Google account

3. **Incorrect App Password**
   - Solution: Generate a new App Password

### No Email Received

1. **Check spam/junk folder**
2. **Verify all environment variables are correctly set**
3. **Check server console for error messages**
4. **Ensure your email provider allows SMTP access**

## Security Notes

- Never commit your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file to version control
- The [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file is already in [.gitignore](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.gitignore) to prevent accidental commits
- Use App Passwords instead of regular passwords for better security
- Store your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file securely

## Manual User Verification (For Testing)

If you need to manually verify a user during testing:

```sql
UPDATE users SET is_verified = 1 WHERE email = 'user@example.com';
```

## How It Works in Code

The email verification process is implemented in several parts:

1. **sendEmailVerification function** - Creates and sends the verification email
2. **User registration endpoint** - Calls sendEmailVerification after creating the user
3. **Email verification endpoint** - Handles the verification link click and updates the user

The system checks for proper email configuration and will skip sending emails if placeholder values are detected.