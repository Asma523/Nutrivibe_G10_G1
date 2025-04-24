// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Add navbar shadow on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Set current date (for profile/dashboard pages)
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const currentDateElement = document.getElementById('current-date');
if (currentDateElement) {
    currentDateElement.textContent = new Date().toLocaleDateString('en-US', dateOptions);
}

document.addEventListener('DOMContentLoaded', function () {
    // Add novalidate to the form element
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.setAttribute('novalidate', '');
    }

    // Get step navigation buttons
    const nextStep1Button = document.getElementById('next-step-1');
    const nextStep2Button = document.getElementById('next-step-2');
    const backStep2Button = document.getElementById('back-step-2');
    const backStep3Button = document.getElementById('back-step-3');

    // Fix the specific problematic fields
    const problematicFields = [
        document.getElementById('height'),
        document.getElementById('weight'),
        document.getElementById('heart-rate'),
        document.getElementById('blood-pressure')
    ];

    // Remove the required attribute when field is not visible
    function updateFieldRequirements() {
        const step2Visible = document.getElementById('step2').classList.contains('active');

        problematicFields.forEach(field => {
            if (field) {
                if (!step2Visible) {
                    // If step 2 is not visible, remove required attribute temporarily
                    field.removeAttribute('required');
                } else {
                    // When step 2 is visible, add required back
                    field.setAttribute('required', '');
                }
            }
        });
    }

    // Function to handle step navigation
    function goToStep(stepNumber) {
        // Hide all steps
        const steps = document.querySelectorAll('.form-step');
        steps.forEach(step => step.classList.remove('active'));

        // Show current step
        document.getElementById('step' + stepNumber).classList.add('active');

        // Update progress bar
        const progressBar = document.getElementById('registration-progress');
        if (progressBar) {
            progressBar.style.width = (stepNumber * 33) + '%';
        }

        // Update step indicators
        const stepIndicators = document.querySelectorAll('.step');
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 <= stepNumber) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update field requirements after changing steps
        updateFieldRequirements();
    }

    // Attach event listeners to navigation buttons
    if (nextStep1Button) {
        nextStep1Button.addEventListener('click', function (e) {
            e.preventDefault();

            // Custom validation for step 1
            const name = document.getElementById('register-name');
            const email = document.getElementById('register-email');
            const password = document.getElementById('register-password');
            const confirmPassword = document.getElementById('register-confirm-password');
            const termsCheck = document.getElementById('terms-check');

            let isValid = true;

            if (!name.value) {
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
            }

            if (!email.value || !email.value.includes('@')) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }

            if (!password.value || password.value.length < 8) {
                password.classList.add('is-invalid');
                isValid = false;
            } else {
                password.classList.remove('is-invalid');
            }

            if (!confirmPassword.value || confirmPassword.value !== password.value) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else {
                confirmPassword.classList.remove('is-invalid');
            }

            if (!termsCheck.checked) {
                termsCheck.classList.add('is-invalid');
                isValid = false;
            } else {
                termsCheck.classList.remove('is-invalid');
            }

            if (isValid) {
                goToStep(2);
            }
        });
    }

    if (nextStep2Button) {
        nextStep2Button.addEventListener('click', function (e) {
            e.preventDefault();

            // Custom validation for step 2 (only if fields are required)
            let isValid = true;

            problematicFields.forEach(field => {
                if (field && field.hasAttribute('required') && !field.value) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else if (field) {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                goToStep(3);
            }
        });
    }

    if (backStep2Button) {
        backStep2Button.addEventListener('click', function (e) {
            e.preventDefault();
            goToStep(1);
        });
    }

    if (backStep3Button) {
        backStep3Button.addEventListener('click', function (e) {
            e.preventDefault();
            goToStep(2);
        });
    }

    // Tab switching functionality
    const loginTab = document.querySelector('[data-tab="login"]');
    const registerTab = document.querySelector('[data-tab="register"]');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');

    if (loginTab && registerTab) {
        loginTab.addEventListener('click', function () {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginContent.classList.add('active');
            registerContent.classList.remove('active');
        });

        registerTab.addEventListener('click', function () {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerContent.classList.add('active');
            loginContent.classList.remove('active');
            goToStep(1);
        });
    }

    // Switch links
    const switchToLogin = document.querySelector('.switch-to-login');
    const switchToRegister = document.querySelector('.switch-to-register');

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            if (loginTab) loginTab.click();
        });
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', function (e) {
            e.preventDefault();
            if (registerTab) registerTab.click();
        });
    }

    // Form submission handling
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Re-enable all fields before submission
            const allFields = registrationForm.querySelectorAll('input, select');
            allFields.forEach(field => {
                field.removeAttribute('disabled');
                if (!field.value && field.hasAttribute('required')) {
                    field.classList.add('is-invalid');
                    e.preventDefault();
                }
            });

            // If all validations pass, submit the form
            // this.submit();
            console.log('Form submitted successfully!');
        });
    }

    // Initialize form
    updateFieldRequirements();
    goToStep(1);
});

document.addEventListener('DOMContentLoaded', function () {
    // Store form data across steps
    let formData = {};
    // Auto-fill function (same as before, with improved logic)
    function autofillHealthMetrics(height, weight) {
        if (!height || !weight) return;

        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

        const mockData = {
            chest: Math.round((height * 0.48) + (weight * 0.1)),
            waist: Math.round((height * 0.37) + (weight * 0.08)),
            hip: Math.round((height * 0.52) + (weight * 0.1)),
            blood_pressure: getMockBloodPressure(bmi),
            blood_sugar: getMockBloodSugar(bmi),
            heart_rate: getMockHeartRate(bmi)
        };

        document.getElementById('chest').value = mockData.chest;
        document.getElementById('waist').value = mockData.waist;
        document.getElementById('hip').value = mockData.hip;
        document.getElementById('blood-pressure').value = mockData.blood_pressure;
        document.getElementById('blood-sugar').value = mockData.blood_sugar;
        document.getElementById('heart-rate').value = mockData.heart_rate;
    }

    function getMockBloodPressure(bmi) {
        if (bmi < 18.5) return "100/65";
        if (bmi < 24.9) return "110/70";
        if (bmi < 29.9) return "120/80";
        return "130/85";
    }

    function getMockBloodSugar(bmi) {
        if (bmi < 18.5) return 80;
        if (bmi < 24.9) return 90;
        if (bmi < 29.9) return 95;
        return 105;
    }

    function getMockHeartRate(bmi) {
        if (bmi < 18.5) return 75;
        if (bmi < 24.9) return 70;
        if (bmi < 29.9) return 72;
        return 78;
    }

    // 👇 Live auto-fill when both height and weight have values
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');

    function handleLiveAutofill() {
        const height = parseInt(heightInput.value);
        const weight = parseInt(weightInput.value);
        if (height && weight) {
            autofillHealthMetrics(height, weight);
        }
    }

    heightInput?.addEventListener('input', handleLiveAutofill);
    weightInput?.addEventListener('input', handleLiveAutofill);

    // Step 1 → Step 2
    document.getElementById('next-step-1')?.addEventListener('click', function () {
        formData.name = document.getElementById('register-name').value;
        formData.email = document.getElementById('register-email').value;
        formData.password = document.getElementById('register-password').value;
        formData.confirm_password = document.getElementById('register-confirm-password').value;

        // Proceed to step 2
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        document.getElementById('registration-progress').style.width = '66%';
    });

    // Auto-fill when height and weight are entered (blur or change)
    ['height', 'weight'].forEach(id => {
        document.getElementById(id)?.addEventListener('blur', () => {
            const height = parseInt(document.getElementById('height').value);
            const weight = parseInt(document.getElementById('weight').value);
            autofillHealthMetrics(height, weight);
        });
    });

    // Step 2 → Step 3
    document.getElementById('next-step-2')?.addEventListener('click', function () {
        formData.age = document.getElementById('age').value;
        formData.gender = document.getElementById('gender').value;
        formData.height = document.getElementById('height').value;
        formData.weight = document.getElementById('weight').value;
        formData.blood_sugar = document.getElementById('blood-sugar').value;
        formData.blood_pressure = document.getElementById('blood-pressure').value;
        formData.heart_rate = document.getElementById('heart-rate').value;
        formData.waist = document.getElementById('waist').value;
        formData.hip = document.getElementById('hip').value;
        formData.chest = document.getElementById('chest').value;

        // Proceed to step 3
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        document.getElementById('registration-progress').style.width = '100%';
    });

    // Final Form Submission
    document.getElementById('registration-form')?.addEventListener('submit', function (e) {
        e.preventDefault();

        formData.primary_goal = document.querySelector('input[name="primary_goal"]:checked').value;
        formData.target_weight = document.getElementById('target-weight').value;
        formData.activity_level = document.getElementById('activity-level').value;

        formData.dietary_preferences = [];
        document.querySelectorAll('input[name="dietary_preferences[]"]:checked').forEach(function (checkbox) {
            formData.dietary_preferences.push(checkbox.value);
        });

        formData.allergies = document.getElementById('allergies').value;
        formData.form_type = 'register';

        console.log('Registration data:', formData);

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = response.url || '/dashboard';
                } else {
                    return response.text().then(text => { throw new Error(text); });
                }
            })
            .catch(error => {
                alert('Registration failed: ' + error.message);
            });
    });
});


// FAQ category filtering (for FAQ pages)
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const category = this.dataset.category;
        const allItems = document.querySelectorAll('.accordion-item');

        if (category === 'all') {
            allItems.forEach(item => item.style.display = 'block');
        } else {
            allItems.forEach(item => {
                item.style.display = item.dataset.category === category ? 'block' : 'none';
            });
        }
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});
