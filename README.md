# NutriSnap – AI Food Recognition & Nutrition Analysis 🍏

NutriSnap is a web-based nutrition assistant that allows users to identify food using AI-powered image recognition and instantly view its nutritional breakdown. The platform also provides health tools such as BMI calculation, RDA recommendations, and personalized diet plans.

---

# Pages Overview

## 1. Home Page (index.html)
Landing page introducing the platform.

Features:
- Hero section explaining NutriSnap
- Overview of features and benefits
- Navigation to all health tools
- Modern health-focused UI design

---

## 2. Food Identification (food-identification.html)
Main AI analysis page where users upload food images.

Features:
- Drag-and-drop image upload
- File upload from device
- Mobile camera integration
- AI food recognition using Spoonacular API
- Smart filename detection (fallback logic)
- Loading animations during analysis
- Food analysis stored in local storage
- Redirect to nutrition analysis page

---

## 3. Nutrition Info (nutrition-info.html)
Displays detailed nutritional information about the detected food.

Features:
- Detected food name and confidence score
- Macronutrient analysis
  - Calories
  - Protein
  - Carbohydrates
  - Fat
  - Fiber
  - Sodium
- Micronutrient analysis
  - Vitamins
  - Minerals
- Nutrition progress bars
- Clean card-based layout
- Summary per serving
- Responsive visualization

---

## 4. BMI Calculator (bmi-calculator.html)
Interactive Body Mass Index calculator.

Features:
- Height and weight input
- Unit toggle (metric/imperial)
- Instant BMI calculation
- BMI category display
- Visual BMI gauge indicator
- Health advice based on BMI

---

## 5. RDA Calculator (rda-calculator.html)
Provides personalized Recommended Dietary Allowance.

Features:
- Age input
- Gender selection
- Activity level selection
- Personalized daily nutrition recommendations
- Estimated daily calorie needs
- Recommended macro intake

---

## 6. Diet Plans (diet-plans.html)
Generates sample diet plans based on user goals.

Features:
- Goal selection
  - Weight loss
  - Muscle gain
  - Balanced diet
- Daily meal plan suggestions
- Breakfast, lunch, dinner suggestions
- Nutrition-balanced recommendations

---

# Key Features

## AI Food Recognition
- Image-based food identification
- Integration with Spoonacular API
- Automatic nutrition estimation
- Smart fallback detection using filename logic

---

## Professional UI/UX Design

- Health-oriented color palette (greens, blues, whites)
- Clean modern typography
- Smooth animations
- Hover effects
- Card-based layout

---

## Interactive Components

- Drag-and-drop file upload
- Mobile camera support
- Nutrition progress bars
- Dynamic health calculations
- Diet plan generator
- Real-time notifications

---

## Responsive Design

- Mobile-first design
- Responsive navigation menu
- Flexible grid layout
- Touch-friendly UI
- Works on desktop, tablet, and mobile devices

---

## User Experience Enhancements

- Loading indicators during AI analysis
- Notifications for actions
- Smooth scrolling
- Form validation
- Local storage for saving analysis data
- Sample food images for testing

---

# Usage

## Online Version (Recommended)

Visit the live website:


---

## Local Development

### Clone the repository

```

```

### Open the project

Simply open:

```
index.html
```

in your browser.

---

# How to Use the Application

### Upload food photos
Use the **Identify Food** page to upload or capture food images.

### View nutrition data
The system analyzes the image and shows a **nutrition breakdown**.

### Calculate BMI
Enter height and weight to determine BMI and health category.

### Get RDA
View personalized daily nutrition recommendations.

### Generate diet plans
Create meal plans based on fitness goals.

---

# Technical Details

- HTML5 semantic structure
- CSS3 with custom properties
- Flexbox and Grid layouts
- Vanilla JavaScript
- Modular utilities (utils.js)
- Local Storage for data persistence
- REST API integration
- Responsive design principles
- Accessibility considerations

---

# Tools & Technologies Used

## Frontend
- HTML5 – Page structure and semantic layout
- CSS3 – Styling, animations, responsive design
- JavaScript (Vanilla JS) – Interactivity and application logic

## Web Technologies
- Flexbox & CSS Grid – Responsive layouts
- Local Storage – Client-side data persistence
- REST API Integration – Food recognition and nutrition analysis

## API Integration
- Spoonacular API – AI-powered food recognition and nutrition estimation

## Development Tools
- Visual Studio Code – Code editor
- Git – Version control system
- GitHub – Repository hosting and project management

## Design & UI/UX
- Modern health-focused UI design principles
- Mobile-first responsive design
- Emoji-based icons for cross-platform compatibility

## Deployment
- GitHub Pages – Hosting the live website

# File Structure

```
nutrisnap-website/

├── index.html
├── food-identification.html
├── nutrition-info.html
├── bmi-calculator.html
├── rda-calculator.html
├── diet-plans.html

├── css/
│   └── style.css

├── js/
│   └── utils.js

├── images/

└── README.md
```

---

# Notes

- Food recognition uses AI services from Spoonacular API
- Camera functionality requires HTTPS in production
- Nutrition values are educational estimates
- Designed following health website UI best practices
- Emoji icons used for cross-platform compatibility

---

# Author

Developed as part of an academic project for learning UI/UX design, web development, and health-based application systems.

