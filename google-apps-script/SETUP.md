# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to save form submissions from your Aimers Foundation website.

## Prerequisites
- Google Account
- Access to Google Drive and Google Sheets
- Access to Google Apps Script (script.google.com)

## Step-by-Step Setup

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Aimers Foundation - Form Submissions"
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`

### Step 2: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script/Code.gs`
5. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
6. Save the project (Ctrl+S) and name it "Aimers Foundation Form Handler"

### Step 3: Deploy as Web App
1. In Google Apps Script, click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Description**: "Aimers Foundation Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### Step 4: Update React Code
1. Open `src/services/googleSheets.js`
2. Replace `YOUR_SCRIPT_ID` in the `GOOGLE_SCRIPT_URL` with your actual script ID from step 3
3. Save the file

### Step 5: Test the Setup (Optional)
1. In Google Apps Script, click "Run" > "testSetup"
2. Grant necessary permissions when prompted
3. Check the execution log to ensure no errors
4. Verify that a test row was added to your Google Sheet

## Configuration Options

### Email Notifications
The script automatically sends email notifications to `foundationaimers@gmail.com` when new forms are submitted. To change this:
1. In `Code.gs`, find the line: `const adminEmail = 'foundationaimers@gmail.com';`
2. Replace with your desired email address

### Sheet Structure
The script creates a sheet with these columns:
- **Timestamp**: When the form was submitted
- **Name**: Student's name
- **Email**: Student's email address
- **Phone**: Student's phone number
- **Grade Level**: Selected grade level
- **Message**: Student's message
- **Status**: Form status (New, Contacted, etc.)

### Duplicate Detection
The system prevents duplicates based on:
- Email address
- Phone number

If either matches an existing entry, the submission is rejected.

## Security Notes

1. **Permissions**: The script runs with your Google account permissions
2. **Data Access**: Only you (the script owner) can access the data
3. **Web App Access**: Set to "Anyone" to allow form submissions from your website
4. **HTTPS**: All data transmission is encrypted via HTTPS

## Troubleshooting

### Common Issues:

1. **"Permission denied" error**
   - Solution: Run the `testSetup` function once to grant permissions

2. **"Spreadsheet not found" error**
   - Solution: Verify the spreadsheet ID is correct in `Code.gs`

3. **Form submissions not appearing**
   - Solution: Check the Web App URL is correctly set in `googleSheets.js`

4. **Duplicate detection not working**
   - Solution: Ensure the sheet has the correct column structure

### Testing:
1. Submit a test form from your website
2. Check if data appears in Google Sheets
3. Try submitting the same data again to test duplicate detection
4. Check email notifications (if configured)

## Advanced Features

### Custom Validation
You can modify the validation rules in `src/services/googleSheets.js` in the `validateFormData` function.

### Additional Fields
To add more form fields:
1. Update the Contact form in `Contact.jsx`
2. Modify the Google Apps Script to handle new fields
3. Update the sheet headers accordingly

### Data Export
Google Sheets allows you to export data in various formats:
- Excel (.xlsx)
- CSV
- PDF
- And more...

## Support
If you encounter issues:
1. Check the Google Apps Script execution log
2. Verify all IDs and URLs are correct
3. Test with simple form data first
4. Ensure proper permissions are granted

## File Locations
- React service: `src/services/googleSheets.js`
- Google Apps Script: `google-apps-script/Code.gs`
- Setup guide: `google-apps-script/SETUP.md`