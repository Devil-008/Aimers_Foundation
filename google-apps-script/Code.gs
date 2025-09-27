// Google Apps Script for handling form submissions to Google Sheets
// This script should be deployed as a Web App in Google Apps Script

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
const SHEET_NAME = 'Form Submissions'; // Name of the sheet tab

function doPost(e) {
  try {
    const { action, name, email, phone, grade, message, timestamp } = e.parameter;
    
    // Get the spreadsheet
    const sheet = getOrCreateSheet();
    
    if (action === 'checkDuplicate') {
      return checkDuplicateEntry(sheet, email, phone);
    } else if (action === 'submit') {
      return submitFormData(sheet, { name, email, phone, grade, message, timestamp });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Internal server error: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  let spreadsheet;
  
  try {
    spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (error) {
    // If spreadsheet doesn't exist, create a new one
    spreadsheet = SpreadsheetApp.create('Aimers Foundation - Form Submissions');
    Logger.log('Created new spreadsheet with ID: ' + spreadsheet.getId());
  }
  
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Grade Level',
      'Message',
      'Status'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4A90E2');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    
    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 200); // Name
    sheet.setColumnWidth(3, 250); // Email
    sheet.setColumnWidth(4, 150); // Phone
    sheet.setColumnWidth(5, 100); // Grade
    sheet.setColumnWidth(6, 300); // Message
    sheet.setColumnWidth(7, 100); // Status
  }
  
  return sheet;
}

function checkDuplicateEntry(sheet, email, phone) {
  try {
    const data = sheet.getDataRange().getValues();
    
    // Skip header row and check for duplicates
    for (let i = 1; i < data.length; i++) {
      const rowEmail = data[i][2]; // Email column (index 2)
      const rowPhone = data[i][3]; // Phone column (index 3)
      
      if (rowEmail === email || rowPhone === phone) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            isDuplicate: true, 
            message: 'An entry with this email or phone number already exists.' 
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        isDuplicate: false, 
        message: 'No duplicate found.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error checking duplicate: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        isDuplicate: false, 
        message: 'Error checking duplicate: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function submitFormData(sheet, formData) {
  try {
    // Check for duplicate before submitting
    const isDuplicate = checkDuplicateEntry(sheet, formData.email, formData.phone);
    const duplicateResponse = JSON.parse(isDuplicate.getContent());
    
    if (duplicateResponse.isDuplicate) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          message: 'Duplicate entry detected. You have already submitted a form with this email or phone number.' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Format timestamp
    const timestamp = new Date(formData.timestamp);
    const formattedTimestamp = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    
    // Prepare data row
    const newRow = [
      formattedTimestamp,
      formData.name,
      formData.email,
      formData.phone,
      formData.grade,
      formData.message,
      'New'
    ];
    
    // Add the new row
    sheet.appendRow(newRow);
    
    // Send notification email to admin (optional)
    sendNotificationEmail(formData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully! We will contact you soon.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error submitting form: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Error submitting form: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(formData) {
  try {
    const adminEmail = 'foundationaimers@gmail.com';
    const subject = 'New Student Inquiry - Aimers Foundation';
    
    const htmlBody = `
      <h2>New Student Inquiry Received</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Grade Level:</strong> ${formData.grade}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p><em>This notification was sent automatically from your website contact form.</em></p>
    `;
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    Logger.log('Error sending notification email: ' + error.toString());
    // Don't fail the entire submission if email fails
  }
}

// Test function to verify setup
function testSetup() {
  const sheet = getOrCreateSheet();
  Logger.log('Sheet created/retrieved successfully: ' + sheet.getName());
  
  // Test data
  const testData = {
    name: 'Test Student',
    email: 'test@example.com',
    phone: '9876543210',
    grade: 'grade-10',
    message: 'This is a test message',
    timestamp: new Date().toISOString()
  };
  
  const result = submitFormData(sheet, testData);
  Logger.log('Test submission result: ' + result.getContent());
}