# Campus Bridge Password Reset Guide

This guide explains how the password reset system works in Campus Bridge and the changes that have been made to ensure security and proper functionality.

## How Password Reset Works

The password reset system follows these steps:

1. User clicks "Forgot Password" link on login page
2. User enters their email address
3. System checks if email exists in database
4. System generates secure reset token and expiration time (1 hour)
5. System stores token in database
6. System sends reset email to user's email address
7. User clicks reset link in email
8. User enters new password
9. System validates token and updates password
10. System clears reset token from database

## Security Enhancements

I've made several important security improvements:

### 1. No Direct Link Display
The system no longer displays reset links directly in the browser. All reset links are sent exclusively via email.

### 2. Consistent User Feedback
Regardless of whether an email exists in the system or whether email is configured, users receive the same generic message:
> "If an account exists with that email, a password reset link has been sent."

This prevents attackers from determining which emails exist in the system.

### 3. Secure Token Generation
The system uses `crypto.randomBytes(32).toString('hex')` to generate cryptographically secure reset tokens.

### 4. Token Expiration
Reset tokens automatically expire after 1 hour for security.

## Email Configuration Behavior

### When Email Is Properly Configured
- System sends password reset email to user's email address
- User receives email with reset link
- User clicks link to reset password

### When Email Is Not Configured
- System generates reset token and stores it in database
- System returns generic success message to user
- No reset link is displayed in browser
- Admin can manually provide reset link if needed

### When Email Sending Fails
- System still generates and stores reset token
- System returns generic success message to user
- No reset link is displayed in browser
- Admin can manually provide reset link if needed

## Manual Reset Link Generation

If you need to manually generate a reset link for a user (for testing or support):

Format:
```
http://yourdomain.com/reset-password.html?token=TOKEN&email=USER_EMAIL
```

To get the token from the database:
```sql
SELECT reset_token, email FROM users WHERE email = 'user@example.com' AND reset_token IS NOT NULL AND reset_token_expires > NOW();
```

## Troubleshooting

### Email Not Being Sent
1. Check that all environment variables are correctly set in [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env)
2. Verify that your email credentials are correct
3. Ensure that your email provider allows SMTP access
4. Check the server console for error messages

### User Can't Reset Password
1. Verify that the user's email exists in the database
2. Check that the reset token hasn't expired (1-hour limit)
3. Ensure the user is clicking the complete reset link

### Security Considerations
1. Never commit your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file to version control
2. Use App Passwords instead of regular passwords for email services
3. Regularly monitor password reset attempts for suspicious activity
4. Consider implementing rate limiting for password reset requests

## Testing the System

1. Navigate to the login page
2. Click "Forgot Password"
3. Enter a valid email address
4. Check that you receive the generic success message
5. If email is configured, check your email for the reset link
6. Click the reset link and set a new password
7. Verify you can log in with the new password