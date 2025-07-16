/* contact-form.js
 * Netlify form submission with client-side validation + redirect.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form'); // real <form>
    if (!form) {
      console.error('[contact-form] Form element #contact-form not found.');
      return;
    }
  
    const submitBtn  = document.getElementById('submit-btn');
    const btnText    = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formStatus = document.getElementById('form-status');
  
    // --- Validation rules ---
    const validators = {
      name: {
        required: true,
        minLength: 2,
        message: 'Please enter your full name (at least 2 characters).'
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address.'
      },
      message: {
        required: true,
        minLength: 10,
        message: 'Please provide more details (at least 10 characters).'
      }
    };
  
    // --- Helpers ---
    function validateField(field) {
      const fieldName    = field.name;
      const validator    = validators[fieldName];
      const errorElement = document.getElementById(fieldName + '-error');
      if (!validator) return true; // no rules => valid
  
      let isValid      = true;
      let errorMessage = '';
  
      const value = field.value.trim();
  
      if (validator.required && !value) {
        isValid = false; errorMessage = validator.message;
      } else if (validator.minLength && value.length < validator.minLength) {
        isValid = false; errorMessage = validator.message;
      } else if (validator.pattern && !validator.pattern.test(value)) {
        isValid = false; errorMessage = validator.message;
      }
  
      // Update UI
      if (!isValid) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        if (errorElement) {
          errorElement.textContent = errorMessage;
          errorElement.style.display = 'block';
        }
      } else {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        if (errorElement) {
          errorElement.textContent = '';
          errorElement.style.display = 'none';
        }
      }
  
      return isValid;
    }
  
    function showFormStatus(message, type) {
      if (!formStatus) return;
      formStatus.textContent = message;
      formStatus.className   = `form-status form-status-${type}`;
      formStatus.style.display = 'block';
  
      if (type === 'success') {
        setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
      }
    }
  
    function shakeForm() {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
    }
  
    function setLoadingState(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      if (btnText)    btnText.style.display    = loading ? 'none' : 'inline';
      if (btnLoading) btnLoading.style.display = loading ? 'inline-flex' : 'none';
      submitBtn.classList.toggle('loading', loading);
    }
  
    // Progressive enhancement: validation events
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      field.addEventListener('blur',  () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });
  
    // --- Encode form data for Netlify ---
    function encodeFormData(formElement) {
      const fd = new FormData(formElement);
  
      // Netlify form-name fallback: sometimes people forget the hidden field;
      // we enforce here just in case.
      if (!fd.has('form-name')) {
        fd.append('form-name', formElement.getAttribute('name') || 'contact');
      }
  
      // URL-encode
      return new URLSearchParams(fd).toString();
    }
  
    // --- Submit handler ---
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // always intercept (AJAX mode)
  
      // Validate all fields
      let valid = true;
      fields.forEach(field => {
        if (!validateField(field)) valid = false;
      });
      if (!valid) {
        showFormStatus('Please correct the errors above before submitting.', 'error');
        shakeForm();
        return;
      }
  
      // Loading UI
      setLoadingState(true);
      showFormStatus('Sending your message...', 'info');
  
      const encoded = encodeFormData(form);
  
      fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: encoded
      })
      .then(response => {
        // Netlify returns 200 for background form capture; we don't need to parse body
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        showFormStatus('Message sent! Redirecting...', 'success');
  
        // Redirect after short delay so user sees message
        setTimeout(() => {
          window.location.href = form.action; // uses your action="/pages/thank-you.html"
        }, 700);
      })
      .catch(err => {
        console.error('[contact-form] submission error:', err);
        showFormStatus('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
        shakeForm();
      })
      .finally(() => {
        setLoadingState(false);
      });
    });
  
    // Micro-interactions (unchanged)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mousedown',  () => { button.style.transform = 'scale(0.98)'; });
      button.addEventListener('mouseup',    () => { button.style.transform = 'scale(1)'; });
      button.addEventListener('mouseleave', () => { button.style.transform = 'scale(1)'; });
    });
  
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
      });
    });
  });
  