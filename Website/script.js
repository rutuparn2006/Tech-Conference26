/* ============================================================
   script.js — Future of Technology Forum 2026
   Form validation using JavaScript
   ============================================================ */

/**
 * Validates an email address using a standard regex pattern.
 * @param {string} value - The email string to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim());
}

/**
 * Validates an Indian mobile number.
 * Accepts formats: +91 XXXXX XXXXX, 10-digit numbers starting with 6-9.
 * @param {string} value - The mobile number string to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateMobile(value) {
  // Strip spaces, dashes, parentheses, and country code prefix
  var digits = value.replace(/[\s\-\+\(\)]/g, '');

  // Remove leading 91 (India country code) if 12 digits total
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }

  // Indian mobile numbers: 10 digits, starting with 6, 7, 8, or 9
  var indiaPattern = /^[6-9]\d{9}$/;
  // Generic 10-digit fallback
  var genericPattern = /^\d{10}$/;

  return indiaPattern.test(digits) || genericPattern.test(digits);
}

/**
 * Shows or hides an error state for a form field.
 * @param {string} fieldId  - The id of the input/select element.
 * @param {boolean} hasError - Whether to show the error state.
 */
function setFieldError(fieldId, hasError) {
  var input = document.getElementById(fieldId);
  var errorMsg = document.getElementById(fieldId + '-err');

  if (input) {
    if (hasError) {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  }

  if (errorMsg) {
    if (hasError) {
      errorMsg.classList.add('show');
    } else {
      errorMsg.classList.remove('show');
    }
  }
}

/**
 * Main form submission handler.
 * Validates all required fields and shows success or error states.
 */
function handleSubmit() {
  var isValid = true;

  // Collect field values
  var firstName = document.getElementById('fname').value.trim();
  var lastName  = document.getElementById('lname').value.trim();
  var email     = document.getElementById('email').value.trim();
  var mobile    = document.getElementById('mobile').value.trim();
  var ticket    = document.getElementById('ticket').value;

  // Validate: First Name
  if (!firstName) {
    setFieldError('fname', true);
    isValid = false;
  } else {
    setFieldError('fname', false);
  }

  // Validate: Last Name
  if (!lastName) {
    setFieldError('lname', true);
    isValid = false;
  } else {
    setFieldError('lname', false);
  }

  // Validate: Email
  if (!validateEmail(email)) {
    setFieldError('email', true);
    isValid = false;
  } else {
    setFieldError('email', false);
  }

  // Validate: Mobile Number
  if (!validateMobile(mobile)) {
    setFieldError('mobile', true);
    isValid = false;
  } else {
    setFieldError('mobile', false);
  }

  // Validate: Ticket Type
  if (!ticket) {
    setFieldError('ticket', true);
    isValid = false;
  } else {
    setFieldError('ticket', false);
  }

  // If all validations pass, show success message
  if (isValid) {
    var formSection = document.getElementById('formSection');
    var successBox  = document.getElementById('success');

    if (formSection) formSection.style.display = 'none';

    if (successBox) {
      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/* ── Live validation on blur (optional UX enhancement) ─────── */
document.addEventListener('DOMContentLoaded', function () {

  var fnameEl  = document.getElementById('fname');
  var lnameEl  = document.getElementById('lname');
  var emailEl  = document.getElementById('email');
  var mobileEl = document.getElementById('mobile');
  var ticketEl = document.getElementById('ticket');

  if (fnameEl) {
    fnameEl.addEventListener('blur', function () {
      setFieldError('fname', !fnameEl.value.trim());
    });
  }

  if (lnameEl) {
    lnameEl.addEventListener('blur', function () {
      setFieldError('lname', !lnameEl.value.trim());
    });
  }

  if (emailEl) {
    emailEl.addEventListener('blur', function () {
      setFieldError('email', !validateEmail(emailEl.value));
    });
  }

  if (mobileEl) {
    mobileEl.addEventListener('blur', function () {
      setFieldError('mobile', !validateMobile(mobileEl.value));
    });
  }

  if (ticketEl) {
    ticketEl.addEventListener('change', function () {
      setFieldError('ticket', !ticketEl.value);
    });
  }

});
