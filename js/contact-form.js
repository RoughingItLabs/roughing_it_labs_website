// Form validation and submission handling

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('form-status');
    
    // Field validation rules
    const validators = {
        name: {
            required: true,
            minLength: 2,
            message: 'Please enter your full name (at least 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Please provide more details about your project (at least 10 characters)'
        }
    };

    // Real-time validation
    function validateField(field) {
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + '-error');
        const validator = validators[fieldName];
        
        if (!validator) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Check required
        if (validator.required && !field.value.trim()) {
            isValid = false;
            errorMessage = validator.message;
        }
        // Check min length
        else if (validator.minLength && field.value.trim().length < validator.minLength) {
            isValid = false;
            errorMessage = validator.message;
        }
        // Check pattern
        else if (validator.pattern && !validator.pattern.test(field.value)) {
            isValid = false;
            errorMessage = validator.message;
        }
        
        // Update field styling and error message
        if (!isValid) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        return isValid;
    }

    // Add validation listeners
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => validateField(field));
        
        // Clear error on input
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormStatus('Please correct the errors above before submitting.', 'error');
            shakeForm();
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        showFormStatus('Sending your message...', 'info');
        
        try {
            // Simulate form submission (replace with actual submission logic)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showFormStatus('Message sent successfully! We\'ll get back to you within 1-2 business days.', 'success');
            form.reset();
            fields.forEach(field => {
                field.classList.remove('error');
                const errorElement = document.getElementById(field.name + '-error');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            });
            
        } catch (error) {
            // Error
            showFormStatus('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
            shakeForm();
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.classList.add('loading');
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.classList.remove('loading');
        }
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status form-status-${type}`;
        formStatus.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    function shakeForm() {
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }

    // Micro-interactions for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Navigation feedback
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle highlight effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}); 