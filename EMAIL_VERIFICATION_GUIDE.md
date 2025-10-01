# Campus Bridge Email Verification Guide

This guide explains how the email verification system works in Campus Bridge and how to make it fully functional.

## How Email Verification Works

The Campus Bridge application implements a two-stage email authentication flow:

### Stage 1: Registration and Email Verification
1. User registers with name, email, and password
2. System creates user account with `is_verified = 0`
3. System sends verification email with unique link
4. User clicks verification link
5. System updates user account to `is_verified = 1`

### Stage 2: Login Confirmation Email
1. User logs in successfully
2. System sends confirmation email to user's registered email

## Current Implementation Status

I've enhanced all email functions to consistently check for placeholder values:

1. **sendEmailConfirmation** - Sent after successful login
2. **sendEmailVerification** - Sent after user registration
3. **sendPasswordResetEmail** - Sent when user requests password reset

All functions now:
- Check if email configuration exists
- Check if using placeholder values
- Skip sending if configuration is incomplete

## To Make Email Verification Work Automatically

### Step 1: Configure Real Email Credentials

Update your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file with actual Gmail credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-actual-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=your-actual-gmail-address@gmail.com
```

### Step 2: Generate Gmail App Password (If using Gmail)

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

### Step 3: Update Your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) File

Replace the placeholder values with your actual information:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcd1234efgh5678
EMAIL_FROM=john.doe@gmail.com
```

### Step 4: Restart Your Application

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

## How It Works After Configuration

### User Registration Flow
1. User fills registration form and submits
2. System creates account with `is_verified = 0`
3. System sends verification email automatically
4. User receives email with verification link
5. User clicks link, which updates their account to `is_verified = 1`

### User Login Flow
1. User enters credentials and logs in
2. System checks if user is verified (`is_verified = 1`)
3. If verified, login proceeds and confirmation email is sent
4. If not verified, login is denied with verification message

## Fallback Behavior

If email configuration is incomplete:
- Users see appropriate messages about verification
- System still enforces verification requirement
- Admin can manually verify users in database if needed

## Manual User Verification (For Testing)

If you need to manually verify a user during testing:

```sql
UPDATE users SET is_verified = 1 WHERE email = 'user@example.com';
```

## Security Notes

1. Never commit your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file to version control
2. Use App Passwords instead of regular passwords for better security
3. Store your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file securely

## Troubleshooting

If emails are not being sent:

1. Check that all environment variables are correctly set
2. Verify that your email credentials are correct
3. Ensure that your email provider allows SMTP access
4. Check the server console for error messages

## Testing the System

1. Register a new user account
2. Check that verification email is sent
3. Click verification link in email
4. Try to log in with verified account
5. Check that login confirmation email is sent