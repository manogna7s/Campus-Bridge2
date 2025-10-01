# How to Enable Real Email Sending for Campus Bridge

To enable real email sending functionality, follow these steps:

## Step 1: Generate a Gmail App Password (Recommended for Gmail users)

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

## Step 2: Update Your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) File

Replace the placeholder values in your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file with your actual credentials:

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

## Step 3: Test Your Configuration

After updating your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:

1. Save the file
2. Run the test script:
   ```bash
   cd /Users/madanthambisetty/Downloads/Campus-Bridge
   node test-email-config.js
   ```

3. Check your email for a test message

## Step 4: Restart Your Application

After confirming the email configuration works:

1. Stop your server (Ctrl+C)
2. Start your server again:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

## Alternative Email Services

If you prefer not to use Gmail, you can configure other email services:

### Outlook/Hotmail
```env
EMAIL_SERVICE=hotmail
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_FROM=your-email@outlook.com
```

### Yahoo
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-password
EMAIL_FROM=your-email@yahoo.com
```

## Troubleshooting

If you encounter issues:

1. **"Username and Password not accepted" Error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Ensure 2FA is enabled
   - Double-check the App Password was generated for "Mail"

2. **Connection Timeout Errors**
   - Check your internet connection
   - Verify firewall settings aren't blocking the connection

3. **Authentication Errors**
   - Verify all environment variables are correctly set
   - Check for typos in your email address or password

## Security Notes

- Never commit your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file to version control
- The [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file is already in [.gitignore](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.gitignore) to prevent accidental commits
- Use App Passwords instead of regular passwords for better security
- Store your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file securely

## How It Works

Once configured correctly:
1. Users requesting password resets will receive actual emails
2. The fallback mechanism (showing reset links directly) will only be used if email fails
3. All other email features (registration confirmation, login confirmation) will work

## Need Help?

If you continue to have issues:
1. Double-check all values in your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file
2. Verify your App Password was generated correctly
3. Ensure 2FA is enabled on your Google account
4. Run the test script to verify configuration