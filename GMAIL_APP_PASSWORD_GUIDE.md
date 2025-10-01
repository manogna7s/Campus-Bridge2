# Gmail App Password Generation Guide

**🎉 SUCCESS: Your email configuration is now working correctly!**

Users will automatically receive verification emails when they register.

## Your Current Configuration

```env
EMAIL_SERVICE=Gmail
EMAIL_USER=manognasamayam@gmail.com
EMAIL_PASS=tpfqytthmezrpdwc
EMAIL_FROM=manognasamayam@gmail.com
```

## What Was Fixed

1. **Spaces Removed**: The App Password was updated to remove spaces (`tpfq ytth mezr pdwc` → `tpfqytthmezrpdwc`)
2. **Tested Successfully**: Email configuration has been verified and is working

## How It Works Now

When users register:
1. They fill out the registration form
2. The system creates their account with `is_verified = 0`
3. The system automatically sends a verification email to their address
4. Users click the verification link in the email
5. Their account is updated to `is_verified = 1`
6. They can now log in

## Testing the System

To verify everything is working:

1. Register a new user account through the web interface
2. Check the email address for a verification message
3. Click the verification link to activate the account
4. Log in with the verified account

## Security Notes

- Your App Password is now properly configured
- The system is using secure practices for email verification
- User data is stored safely in the database

## Need Help?

If you encounter any issues:
1. Check that your server is running
2. Look for any error messages in the console
3. Verify that the email address used for registration is correct

Congratulations! Your email verification system is now fully functional.

If you can't find "Gmail" in the app list, follow these specific steps:

## Step-by-Step Instructions

1. **Sign in to your Google Account**
   - Go to https://myaccount.google.com/

2. **Navigate to Security Settings**
   - Click on "Security" in the left navigation panel

3. **Enable 2-Step Verification (if not already enabled)**
   - Scroll down to "2-Step Verification" and click on it
   - Follow the prompts to set up 2FA if it's not already enabled

4. **Generate App Password**
   - Scroll down to "App passwords" (under "2-Step Verification")
   - Click on "App passwords"

5. **Select App and Device**
   - Under "Select app," choose "Mail" (not "Gmail" - this is the correct option)
   - Under "Select device," choose "Other (Custom name)"
   - Enter "Campus Bridge" as the custom name
   - Click "Generate"

6. **Copy and Use the Password**
   - You'll see a 16-character password displayed
   - Copy this password (without spaces)
   - Use it in your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file

## Common Issues and Solutions

### Issue: "Mail" option not available
- Make sure 2-Step Verification is enabled first
- Try refreshing the page
- Try using a different browser

### Issue: "Other" device option not available
- This should always be available
- Make sure you're not selecting a pre-defined device option

### Issue: App password not working
- Make sure you're copying all 16 characters
- Ensure there are no spaces in the password
- Double-check that you're using the App Password, not your regular password

## Example Configuration

Once you have your App Password, update your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file like this:

```env
# Email Configuration
# For Gmail, you need to generate an App Password: https://myaccount.google.com/apppasswords
EMAIL_SERVICE=Gmail
EMAIL_USER=manognasamayam@gmail.com
EMAIL_PASS=abcdefghijklmnop  # Your 16-character App Password (no spaces)
EMAIL_FROM=manognasamayam@gmail.com
```

## Testing Your Configuration

After updating your [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) file:

1. Restart your server
2. Register a new user account
3. Check the email address for a verification message
4. Click the verification link to activate the account

## Alternative Email Services

If you continue to have issues with Gmail, you can use other email services:

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

## Need Help?

If you're still having trouble:
1. Take a screenshot of the App Passwords page
2. Check that 2-Step Verification is definitely enabled
3. Try using an incognito/private browser window
