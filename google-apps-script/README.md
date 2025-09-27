# Google Sheets Integration - Aimers Foundation Website

## Overview
This integration allows the Aimers Foundation contact form to automatically save submissions to Google Sheets while preventing duplicate entries based on email and phone number.

## Features
- ✅ **Automatic Data Storage**: Form submissions are saved to Google Sheets
- ✅ **Duplicate Prevention**: Checks email and phone numbers to prevent duplicate entries  
- ✅ **Real-time Validation**: Client-side form validation with error messages
- ✅ **Email Notifications**: Automatic email alerts to admin when forms are submitted
- ✅ **Professional UI**: Loading states, success/error messages, and form disabled states
- ✅ **Mobile Responsive**: Works perfectly on all device sizes
- ✅ **Data Security**: All communication encrypted via HTTPS

## Files Created/Modified

### New Files:
1. **`src/services/googleSheets.js`** - Main service for Google Sheets integration
2. **`google-apps-script/Code.gs`** - Google Apps Script backend code
3. **`google-apps-script/SETUP.md`** - Detailed setup instructions
4. **`google-apps-script/README.md`** - This documentation file

### Modified Files:
1. **`src/components/Contact.jsx`** - Updated with form state management and validation
2. **`src/App.css`** - Added styles for form validation states and feedback

## Setup Instructions

### Quick Start:
1. Follow the detailed setup guide in `google-apps-script/SETUP.md`
2. Replace the Google Apps Script URL in `src/services/googleSheets.js`
3. Test the form submission from your website

### Key Configuration Points:
- **Spreadsheet ID**: Update in Google Apps Script (`Code.gs`)
- **Web App URL**: Update in React service (`googleSheets.js`)
- **Admin Email**: Change notification email address in Google Apps Script

## Form Fields
The contact form captures the following data:
- **Name** (minimum 2 characters)
- **Email** (valid email format)
- **Phone** (10-digit Indian mobile number)
- **Grade Level** (dropdown selection)
- **Message** (minimum 10 characters)
- **Timestamp** (automatically added)

## Validation Rules

### Client-side Validation:
- Name: Minimum 2 characters
- Email: Valid email format required
- Phone: 10-digit number starting with 6-9 (Indian format)
- Grade: Must select a grade level
- Message: Minimum 10 characters

### Server-side Duplicate Check:
- Email address must be unique
- Phone number must be unique
- If either exists, submission is rejected with user-friendly message

## User Experience

### Form States:
1. **Default State**: Clean form ready for input
2. **Validation State**: Real-time error messages for invalid inputs
3. **Submitting State**: Loading spinner, form disabled, "Sending..." text
4. **Success State**: Green success message, form reset automatically
5. **Error State**: Red error message with specific problem description

### Success Flow:
1. User fills form completely
2. Client-side validation passes
3. Duplicate check passes
4. Data saved to Google Sheets
5. Email notification sent to admin
6. Success message shown to user
7. Form resets for next submission

### Error Handling:
- **Validation Errors**: Highlighted fields with specific error messages
- **Duplicate Detection**: Clear message about existing entry
- **Network Errors**: Generic retry message with contact information
- **Server Errors**: Fallback to direct contact options

## Data Structure in Google Sheets

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | When form was submitted | 27/09/2025 14:30:15 |
| Name | Student's full name | John Doe |
| Email | Contact email address | john.doe@email.com |
| Phone | Mobile number | 9876543210 |
| Grade Level | Selected grade | grade-10 |
| Message | Student's inquiry | I want to join math classes |
| Status | Processing status | New |

## Security Features

### Data Protection:
- All communication uses HTTPS encryption
- No sensitive data stored in client-side code
- Google Apps Script runs with your account permissions
- Sheet access limited to script owner

### Spam Prevention:
- Form validation prevents incomplete submissions
- Duplicate detection stops repeat submissions
- Rate limiting possible through Google Apps Script quotas
- Real user interaction required (no automated submissions)

## Monitoring & Analytics

### Google Sheets Benefits:
- **Real-time Data**: Submissions appear immediately
- **Easy Export**: Download as Excel, CSV, PDF
- **Sorting/Filtering**: Organize data by any column
- **Status Tracking**: Update status column manually
- **Data Analysis**: Use Google Sheets formulas and charts

### Email Notifications:
- Instant alerts when new students inquire
- Formatted HTML emails with all details
- Sent to specified admin email address
- Includes student's complete information

## Troubleshooting

### Common Issues:
1. **Form not submitting**: Check Google Apps Script Web App URL
2. **Duplicate detection not working**: Verify sheet column structure
3. **No email notifications**: Check email address in script
4. **Permission errors**: Re-run script authorization

### Testing Steps:
1. Submit test form with unique data
2. Verify data appears in Google Sheets  
3. Test duplicate detection with same email/phone
4. Check email notification delivery
5. Test form validation with invalid data

## Maintenance

### Regular Tasks:
- Monitor Google Sheets for new submissions
- Update form status column as needed
- Export data for backup/analysis
- Check Google Apps Script quotas if issues arise

### Updates:
- Form fields can be modified in `Contact.jsx`
- Validation rules updated in `googleSheets.js`
- Sheet structure changes require script updates
- Email template customizable in `Code.gs`

## Support
For technical support or questions:
- Email: foundationaimers@gmail.com
- Phone: 6296161065 / 9382423302

---

**Integration completed successfully!** ✅

The Aimers Foundation website now has professional form handling with Google Sheets integration, duplicate prevention, and comprehensive error handling.