# Campus Bridge Render Deployment Guide

To make email verification work on Render, you need to set environment variables in the Render dashboard since Render doesn't use [.env](file:///Users/madanthambisetty/Downloads/Campus-Bridge/.env) files directly.

## Environment Variables to Set in Render

You need to add the following environment variables in your Render dashboard:

| Variable Name | Value |
|---------------|-------|
| EMAIL_SERVICE | Gmail |
| EMAIL_USER | manognasamayam@gmail.com |
| EMAIL_PASS | tpfqytthmezrpdwc |
| EMAIL_FROM | manognasamayam@gmail.com |

## How to Set Environment Variables in Render

1. **Log in to Render**
   - Go to https://render.com and log in to your account

2. **Navigate to Your Service**
   - Click on your Campus Bridge web service

3. **Go to Environment Variables Settings**
   - In the left sidebar, click on "Environment"
   - Or go to the "Settings" tab and scroll down to "Environment Variables"

4. **Add Environment Variables**
   - Click "Add Environment Variable" for each variable:
   
   a. **EMAIL_SERVICE**
      - Key: `EMAIL_SERVICE`
      - Value: `Gmail`
   
   b. **EMAIL_USER**
      - Key: `EMAIL_USER`
      - Value: `manognasamayam@gmail.com`
   
   c. **EMAIL_PASS**
      - Key: `EMAIL_PASS`
      - Value: `tpfqytthmezrpdwc`
   
   d. **EMAIL_FROM**
      - Key: `EMAIL_FROM`
      - Value: `manognasamayam@gmail.com`

5. **Save Changes**
   - Click "Save Changes" or "Update Environment" button

## Redeploy Your Application

After setting the environment variables:

1. **Trigger a New Deployment**
   - Go to the "Manual Deploy" section
   - Click "Deploy" or "Create Deployment"
   - Or push a small change to your repository to trigger automatic deployment

2. **Wait for Deployment to Complete**
   - Monitor the build logs for any errors
   - Wait for the deployment to finish successfully

## Verify Email Configuration on Render

After deployment is complete:

1. **Test User Registration**
   - Go to your Render app URL
   - Try to register a new user account
   - Check if a verification email is sent

2. **Check Render Logs**
   - In the Render dashboard, go to "Logs"
   - Look for messages about email sending
   - Check for any error messages

## Troubleshooting

### If Emails Still Don't Work

1. **Check Environment Variables**
   - Verify all environment variables are set correctly
   - Make sure there are no extra spaces in the values

2. **Check Render Logs**
   - Look for error messages related to email sending
   - Check if the app is reading the environment variables correctly

3. **Verify App Password**
   - Make sure the Gmail App Password hasn't been revoked
   - Generate a new App Password if needed

### Common Render Issues

1. **Environment Variables Not Loading**
   - Make sure you're setting them in the correct service
   - Check that variable names match exactly (case-sensitive)

2. **Build Failures**
   - Check package.json dependencies
   - Ensure all required packages are listed

## Testing the Setup

Once deployed:

1. Register a new user account
2. Check the email address for a verification message
3. Click the verification link to activate the account
4. Log in with the verified account

Your application should now send verification emails through Render using the environment variables you've set.