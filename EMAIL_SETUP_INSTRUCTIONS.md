# Campus Bridge Email Setup Instructions

You've started configuring your email settings, but to ensure the email verification system works properly, you need to use a Gmail App Password instead of your regular password.

## Why You Need an App Password

Google's security policies require using App Passwords for applications that need to send emails through Gmail. Your regular Gmail password won't work with this application.

## How to Generate a Gmail App Password

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Click on "Security" in the left sidebar
   - Under "Signing in to Google," make sure "2-Step Verification" is turned ON
   - If it's not enabled, click on it and follow the prompts to set it up

2. **Generate an App Password**
   - In the same "Security" section, scroll down to "App passwords"
   - If you can't see this option, make sure 2FA is enabled
   - Click on "App passwords"
   - Under "Select app," choose "Mail"
   - Under "Select device," choose "Other (Custom name)"
   - Type "Campus Bridge" as the custom name
   - Click "Generate"
   - Copy the 16-character password (without spaces)

3. **Update Your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) File**
   Replace `YOUR_16_CHARACTER_APP_PASSWORD_HERE` with the App Password you just generated:
   ```env
   EMAIL_SERVICE=Gmail
   EMAIL_USER=manognasamayam@gmail.com
   EMAIL_PASS=your-16-character-app-password-here
   EMAIL_FROM=manognasamayam@gmail.com
   ```

## Example

If your generated App Password is:
```
abcd efgh ijkl mnop
```

Remove the spaces and update your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file like this:
```env
EMAIL_SERVICE=Gmail
EMAIL_USER=manognasamayam@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM=manognasamayam@gmail.com
```

## Test Your Configuration

After updating your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:

1. **Restart your server**
   - Stop your server (Ctrl+C)
   - Start it again with `npm start` or `node server.js`

2. **Test the email system**
   - Register a new user account
   - Check the email address for a verification message
   - Click the verification link to activate the account
   - Log in with the verified account

## Troubleshooting

If you're still having issues:

1. **Double-check your App Password**
   - Make sure you're using the App Password, not your regular password
   - Ensure there are no spaces in the password

2. **Verify 2-Factor Authentication**
   - Make sure 2FA is enabled on your Google account

3. **Check for errors in the console**
   - Look for any email-related error messages when registering a user

## Security Notes

- Never share your App Password with others
- You can revoke App Passwords at any time through your Google Account settings
- Consider creating a separate Gmail account specifically for this application if you prefer

Once you've updated your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file with a proper App Password, users will automatically receive verification emails when they register.