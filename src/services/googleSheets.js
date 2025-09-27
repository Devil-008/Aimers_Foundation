// Google Sheets API service for handling form submissions
class GoogleSheetsService {
  constructor(scriptURL) {
    this.scriptURL = scriptURL;
  }

  // Submit form data to Google Sheets
  async submitForm(formData) {
    try {
      const response = await fetch(this.scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          grade: formData.grade,
          message: formData.message,
          timestamp: new Date().toISOString(),
          action: 'submit'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      
      // Parse response - Google Apps Script returns JSON as text
      try {
        return JSON.parse(result);
      } catch (parseError) {
        // If parsing fails, return the raw result
        return { success: true, message: 'Form submitted successfully!' };
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw new Error('Failed to submit form. Please try again.');
    }
  }

  // Check for duplicate entries
  async checkDuplicate(email, phone) {
    try {
      const response = await fetch(this.scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          phone: phone,
          action: 'checkDuplicate'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      
      try {
        const parsed = JSON.parse(result);
        return parsed.isDuplicate || false;
      } catch (parseError) {
        // If parsing fails, assume no duplicate for safety
        return false;
      }
    } catch (error) {
      console.error('Error checking duplicate:', error);
      // If check fails, allow submission to avoid blocking users
      return false;
    }
  }
}

// Create service instance
// Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxu4bdFU2B1r5Hubacw_94n76etcl_J5Sn0pu_Fyzgic8INtzzqkv0kBRpauyTa9hYQAg/exec";

export const googleSheetsService = new GoogleSheetsService(GOOGLE_SCRIPT_URL);

// Utility function to validate form data
export const validateFormData = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (Indian mobile number format)
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = formData.phone.replace(/\s+/g, '').replace(/[^\d]/g, '');
  if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }

  // Grade validation
  if (!formData.grade) {
    errors.grade = 'Please select a grade level';
  }

  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};