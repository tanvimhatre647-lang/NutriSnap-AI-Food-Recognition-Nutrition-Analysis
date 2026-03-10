// NutriSnap Website Utilities

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Set active nav link based on current page
    setActiveNavLink();
    
    // Check auth state for dashboard link
    updateDashboardNavVisibility();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updateDashboardNavVisibility() {
    const dashboardLinks = document.querySelectorAll('.dashboard-nav-link');
    const isAuthenticated = localStorage.getItem('nutrisnap_auth') === 'true';
    
    dashboardLinks.forEach(link => {
        if (isAuthenticated) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });
}

// Form validation utilities
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);
        }
    });

    return isValid;
}

function showError(input, message) {
    clearError(input);
    input.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-red)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    input.parentNode.appendChild(errorElement);
}

function clearError(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Animation utilities
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// File upload utilities
function initializeFileUpload(uploadZone, fileInput, callback) {
    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0], uploadZone, callback);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0], uploadZone, callback);
        }
    });
}

function handleFileSelect(file, uploadZone, callback) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPEG, PNG, WebP)', 'error');
        return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showNotification('File size should be less than 5MB', 'error');
        return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        updateUploadZone(uploadZone, e.target.result, file.name);
        if (callback) callback(file, e.target.result);
    };
    reader.readAsDataURL(file);
}

function updateUploadZone(uploadZone, imageSrc, fileName) {
    uploadZone.innerHTML = `
        <img src="${imageSrc}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 8px; margin-bottom: 1rem;">
        <p style="color: var(--text-dark); font-weight: 600;">${fileName}</p>
        <p style="color: var(--text-light); font-size: 0.9rem;">Click to change image</p>
    `;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 1rem;">&times;</button>
    `;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        success: 'var(--success-green)',
        error: 'var(--error-red)',
        warning: 'var(--warning-orange)',
        info: 'var(--secondary-blue)'
    };
    notification.style.background = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading state utilities
function showLoading(element, text = 'Loading...') {
    const originalContent = element.innerHTML;
    element.dataset.originalContent = originalContent;
    element.disabled = true;
    element.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <div class="loading-spinner"></div>
            ${text}
        </div>
    `;

    // Add spinner styles if not already present
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            .loading-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoading(element) {
    if (element.dataset.originalContent) {
        element.innerHTML = element.dataset.originalContent;
        element.disabled = false;
        delete element.dataset.originalContent;
    }
}

// Chart utilities for nutrition displays
function createProgressBar(container, label, value, maxValue, color) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    
    const progressElement = document.createElement('div');
    progressElement.className = 'macro-item';
    progressElement.innerHTML = `
        <div style="display: flex; align-items: center;">
            <div class="macro-icon" style="background: ${color};">
                ${getMacroIcon(label)}
            </div>
            <div>
                <div style="font-weight: 600; color: var(--text-dark);">${label}</div>
                <div style="font-size: 0.9rem; color: var(--text-light);">${value}${getUnit(label)} / ${maxValue}${getUnit(label)}</div>
            </div>
        </div>
        <div style="min-width: 100px;">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%; background: ${color};"></div>
            </div>
            <div style="text-align: center; font-size: 0.875rem; color: var(--text-light);">${percentage.toFixed(1)}%</div>
        </div>
    `;
    
    container.appendChild(progressElement);
}

function getMacroIcon(label) {
    const icons = {
        'Calories': '🔥',
        'Protein': '🥩',
        'Carbs': '🍞',
        'Fat': '🥑',
        'Fiber': '🌾'
    };
    return icons[label] || '📊';
}

function getUnit(label) {
    const units = {
        'Calories': ' kcal',
        'Protein': 'g',
        'Carbs': 'g',
        'Fat': 'g',
        'Fiber': 'g'
    };
    return units[label] || '';
}

// BMI calculation utilities
function calculateBMI(weight, height, weightUnit = 'kg', heightUnit = 'cm') {
    // Convert to metric if needed
    let weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    let heightM = heightUnit === 'ft' ? height * 0.3048 : height / 100;

    const bmi = weightKg / (heightM * heightM);
    return Math.round(bmi * 10) / 10;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: 'var(--secondary-blue)' };
    if (bmi < 25) return { category: 'Normal weight', color: 'var(--success-green)' };
    if (bmi < 30) return { category: 'Overweight', color: 'var(--warning-orange)' };
    return { category: 'Obese', color: 'var(--error-red)' };
}

// RDA calculation utilities
function calculateRDA(age, gender, weight, height, activityLevel) {
    // Basic metabolic rate calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Activity level multipliers
    const activityMultipliers = {
        'sedentary': 1.2,
        'lightly-active': 1.375,
        'moderately-active': 1.55,
        'very-active': 1.725,
        'extra-active': 1.9
    };

    const calories = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));

    // Macronutrient distribution (as percentages of total calories)
    const proteinCalories = calories * 0.15; // 15% protein
    const carbCalories = calories * 0.55;    // 55% carbs
    const fatCalories = calories * 0.30;     // 30% fat

    return {
        calories: calories,
        protein: Math.round(proteinCalories / 4), // 4 kcal per gram
        carbs: Math.round(carbCalories / 4),      // 4 kcal per gram
        fat: Math.round(fatCalories / 9),         // 9 kcal per gram
        fiber: Math.round(calories / 1000 * 14),  // 14g per 1000 kcal
        water: Math.round(weight * 35)            // 35ml per kg body weight
    };
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to read from localStorage:', e);
        return null;
    }
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    animateOnScroll();
});

// Export functions for use in other files
window.NutriSnapUtils = {
    initializeNavigation,
    validateForm,
    showError,
    clearError,
    animateOnScroll,
    initializeFileUpload,
    showNotification,
    showLoading,
    hideLoading,
    createProgressBar,
    calculateBMI,
    getBMICategory,
    calculateRDA,
    saveToLocalStorage,
    getFromLocalStorage
};
