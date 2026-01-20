# Physiology Nursing Practical Revision - Interactive Quiz

An interactive web-based quiz application for nursing students to practice physiology practical revision. This project transforms PowerPoint slides into an engaging, interactive learning experience.

## 🎯 Project Overview

This application converts the "Physiology for nursing practical revision fall 2025-2026" PowerPoint presentation into an interactive quiz format. Each slide contains questions related to the displayed image, with multiple-choice answers and instant feedback.

## 🚀 Features

- **Interactive Quiz Interface**: Clean, responsive design with slide-based navigation
- **Sound Effects**: Audio feedback for correct and incorrect answers
- **Progress Tracking**: Visual progress bar and slide counter
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Instant Feedback**: Immediate visual and audio feedback after answering
- **Score Calculation**: Final score and accuracy percentage at quiz completion

## 📁 Project Structure

```
physiology-nursing-quiz/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript logic
├── README.md           # This file
├── questions_data_with_options.json  # Quiz questions data
└── assets/
    ├── images/
    │   ├── slide_1.png
    │   ├── slide_2.png
    │   └── ... (29 slides total)
    └── sounds/
        ├── correct.mp3
        └── wrong.mp3
```

## 🎮 How to Use

1. **Open the Quiz**: Open `index.html` in a web browser
2. **Navigate Slides**: Use "Previous" and "Next" buttons to navigate between slides
3. **Answer Questions**: Click on one of the four options (A, B, C, D) for each question
4. **Get Feedback**: Receive instant visual and audio feedback
5. **View Results**: See your final score after completing all questions

## 🏗️ Technical Implementation

### Data Structure

Questions are stored in `questions_data_with_options.json` with the following structure:

```json
{
  "page": 2,
  "image_id": "slide_2",
  "questions": [
    {
      "id": "q2_1",
      "question": "Describe the pupil:",
      "answer": "Dilated",
      "type": "describe",
      "options": ["Irregular", "Constricted", "Dilated", "Normal"],
      "correct_index": 2
    }
  ]
}
```

### Image ID System

- Each slide corresponds to an image file named `slide_X.png`
- `image_id` in the data matches the filename without extension
- All images are stored in `assets/images/` directory

### Focus Areas (Future Enhancement)

The system supports highlighting specific areas of images using focus coordinates:

```javascript
focus_area: {
  x: 50,      // x coordinate as percentage
  y: 30,      // y coordinate as percentage  
  width: 20,  // width as percentage
  height: 15  // height as percentage
}
```

When a `focus_area` is defined, a red arrow SVG appears pointing to that area.

## 🎨 Design Features

### Color Scheme
- **Primary Colors**: Soft purple gradient (#667eea to #764ba2)
- **Background**: Light gray (#f8f9fa) for comfortable reading
- **Success**: Green (#28a745) for correct answers
- **Error**: Red (#dc3545) for incorrect answers
- **Text**: Dark gray (#333) for optimal readability

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive Text**: Font sizes adjust for different screen sizes
- **Clear Hierarchy**: Distinct visual levels for questions, options, and feedback

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px+ (side-by-side layout)
- **Tablet**: 768px-1199px (stacked layout)
- **Mobile**: <768px (optimized single column)

## 🔧 Setup Instructions

### Local Development

1. Clone or download this repository
2. Ensure all files are in the same directory structure
3. Open `index.html` in a web browser
4. No server required (works with `file://` protocol)

### Deployment to GitHub Pages

1. Create a new GitHub repository
2. Upload all files maintaining the directory structure
3. Go to Settings → Pages
4. Select source: Deploy from a branch
5. Choose your branch and root folder
6. Click Save and wait for deployment

### Alternative Deployment

Upload the entire project folder to any web hosting service or use:
- Netlify: Drag and drop the project folder
- Vercel: Use `vercel --prod` command
- Firebase Hosting: Use `firebase deploy`

## 📊 Content Coverage

The quiz covers the following physiology topics:

1. **Autonomic Nervous System** (Slides 2-5)
   - Pupil dilation and constriction
   - Sympathetic and parasympathetic systems
   - Urinary bladder and rectum functions

2. **Blood Groups** (Slides 6-13)
   - ABO system and Rh factor
   - Blood group determination procedures
   - Equipment and testing methods

3. **Cell Transport** (Slides 14-15)
   - Simple transport mechanisms
   - Primary active transport

4. **ECG Analysis** (Slides 16-24)
   - Heart rate calculation
   - Normal ECG interpretation
   - Tachycardia and bradycardia identification

5. **Blood Glucose** (Slides 25-28)
   - Glucometer usage
   - Normal, hyperglycemic, and hypoglycemic levels

## 🎯 Question Types

### Multiple Choice Questions (MCQ)
All questions are presented as 4-option multiple choice:
- **A, B, C, D** options with clear visual indicators
- Scientifically relevant wrong answers from same context
- Immediate feedback after selection

### Question Categories
- **Describe**: Identify characteristics of physiological states
- **Identify**: Recognize devices, curves, or systems
- **Calculate**: Compute heart rates from ECG data
- **Comment**: Interpret glucose levels and clinical significance

## 🔊 Sound Effects

The application includes custom-generated sound effects:
- **Correct Answer**: Positive, encouraging tone (1 second)
- **Wrong Answer**: Gentle, informative tone (1 second)
- Audio files stored in `assets/sounds/` directory

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Flexbox, Grid, and modern styling features
- **Vanilla JavaScript**: ES6+ features, no frameworks
- **JSON**: Data storage format
- **SVG**: Custom arrow graphics for focus areas

## 🌟 Key Features Implementation

### Progressive Enhancement
- Works without JavaScript (shows static content)
- Enhanced functionality with JS enabled
- Graceful fallbacks for missing resources

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color ratios

### Performance
- Lazy loading of questions data
- Optimized image rendering
- Minimal external dependencies
- Efficient DOM manipulation

## 📝 License

This educational project is created for nursing students. Feel free to use, modify, and distribute for educational purposes.

## 🤝 Contributing

To add more questions or modify content:

1. Edit `questions_data_with_options.json`
2. Add corresponding images to `assets/images/`
3. Follow the existing data structure
4. Test thoroughly before deploying

## 📞 Support

For technical issues or questions about the content:
- Check browser compatibility (modern browsers recommended)
- Ensure all files are in correct directories
- Verify JSON data syntax if adding new questions

---

**Happy Learning!** 🎓

Built with ❤️ for nursing education
