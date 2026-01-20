// Quiz Data - Will be loaded from JSON
let quizData = [];
let currentSlideIndex = 0;
let userAnswers = {};
let totalQuestions = 0;
let answeredQuestions = 0;

// Load quiz data
async function loadQuizData() {
    try {
        const response = await fetch('questions_data_with_options.json');
        quizData = await response.json();
        
        // Filter out pages without questions
        quizData = quizData.filter(page => page.questions.length > 0);
        
        // Count total questions
        totalQuestions = quizData.reduce((sum, page) => sum + page.questions.length, 0);
        
        // Initialize UI
        initializeQuiz();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        // Fallback data if JSON fails to load
        loadFallbackData();
    }
}

// Fallback data in case JSON doesn't load
function loadFallbackData() {
    quizData = [
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
                },
                {
                    "id": "q2_2",
                    "question": "Mention the autonomic nervous system responsible for this action:",
                    "answer": "Sympathetic",
                    "type": "identify",
                    "options": ["Somatic", "Sympathetic", "Central", "Parasympathetic"],
                    "correct_index": 1
                }
            ]
        }
    ];
    totalQuestions = 2;
    initializeQuiz();
}

// Initialize the quiz
function initializeQuiz() {
    updateProgress();
    displaySlide();
    updateNavigationButtons();
}

// Update progress bar
function updateProgress() {
    const progress = ((currentSlideIndex + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
    document.getElementById('totalSlides').textContent = quizData.length;
}

// Display current slide
function displaySlide() {
    const currentPage = quizData[currentSlideIndex];
    
    // Update slide image
    const slideImage = document.getElementById('slideImage');
    slideImage.src = `assets/images/slide_${currentPage.page}.png`;
    slideImage.alt = `Slide ${currentPage.page}`;
    
    // Update slide title
    document.getElementById('slideTitle').textContent = `Slide ${currentPage.page}`;
    
    // Display questions
    displayQuestions(currentPage.questions);
    
    // Hide focus arrow (no focus areas defined in this dataset)
    document.getElementById('focusArrow').classList.remove('visible');
}

// Display questions for current slide
function displayQuestions(questions) {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    questions.forEach((question, qIndex) => {
        const questionElement = createQuestionElement(question, qIndex);
        container.appendChild(questionElement);
    });
}

// Create question element
function createQuestionElement(question, qIndex) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.id = `question_${question.id}`;
    
    // Question text
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = `${qIndex + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);
    
    // Options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    question.options.forEach((option, oIndex) => {
        const optionButton = createOptionButton(option, oIndex, question, qIndex);
        optionsContainer.appendChild(optionButton);
    });
    
    questionDiv.appendChild(optionsContainer);
    
    // Feedback element
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback';
    feedbackDiv.id = `feedback_${question.id}`;
    questionDiv.appendChild(feedbackDiv);
    
    return questionDiv;
}

// Create option button
function createOptionButton(option, oIndex, question, qIndex) {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.id = `option_${question.id}_${oIndex}`;
    
    const letters = ['A', 'B', 'C', 'D'];
    
    button.innerHTML = `
        <div class="option-content">
            <span class="option-letter">${letters[oIndex]}</span>
            <span class="option-text">${option}</span>
        </div>
    `;
    
    button.addEventListener('click', () => selectOption(question, oIndex, button));
    
    // Restore previous answer if exists
    const answerKey = `${currentSlideIndex}_${qIndex}`;
    if (userAnswers[answerKey] !== undefined) {
        button.disabled = true;
        button.classList.add('disabled');
        
        if (oIndex === question.correct_index) {
            button.classList.add('correct');
        } else if (oIndex === userAnswers[answerKey]) {
            button.classList.add('incorrect');
        }
    }
    
    return button;
}

// Handle option selection
function selectOption(question, selectedIndex, buttonElement) {
    const answerKey = `${currentSlideIndex}_${question.id.split('_')[1] - 1}`;
    
    // Prevent multiple answers for same question
    if (userAnswers[answerKey] !== undefined) {
        return;
    }
    
    // Record answer
    userAnswers[answerKey] = selectedIndex;
    answeredQuestions++;
    
    // Disable all options for this question
    const allOptions = document.querySelectorAll(`[id^="option_${question.id}_"]`);
    allOptions.forEach(opt => {
        opt.disabled = true;
        opt.classList.add('disabled');
    });
    
    // Show correct/incorrect feedback
    const isCorrect = selectedIndex === question.correct_index;
    
    if (isCorrect) {
        buttonElement.classList.add('correct');
        playSound('correct');
        showFeedback(question.id, true, question.answer);
    } else {
        buttonElement.classList.add('incorrect');
        playSound('wrong');
        showFeedback(question.id, false, question.answer);
        
        // Also highlight correct answer
        const correctButton = document.getElementById(`option_${question.id}_${question.correct_index}`);
        correctButton.classList.add('correct');
    }
}

// Show feedback
function showFeedback(questionId, isCorrect, correctAnswer) {
    const feedbackDiv = document.getElementById(`feedback_${questionId}`);
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'} visible`;
    
    if (isCorrect) {
        feedbackDiv.textContent = '✓ Correct! Well done.';
    } else {
        feedbackDiv.textContent = `✗ Incorrect. The correct answer is: ${correctAnswer}`;
    }
}

// Play sound
function playSound(type) {
    const sound = document.getElementById(`${type}Sound`);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

// Navigation functions
function nextSlide() {
    if (currentSlideIndex < quizData.length - 1) {
        currentSlideIndex++;
        updateProgress();
        displaySlide();
        updateNavigationButtons();
    } else {
        // Quiz completed
        showResults();
    }
}

function previousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateProgress();
        displaySlide();
        updateNavigationButtons();
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSlideIndex === 0;
    
    if (currentSlideIndex === quizData.length - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// Show results
function showResults() {
    let correctAnswers = 0;
    
    // Calculate score
    Object.keys(userAnswers).forEach(key => {
        const [slideIdx, qId] = key.split('_');
        const slide = quizData[slideIdx];
        if (slide) {
            const question = slide.questions.find(q => q.id === `q${slide.page}_${qId}`);
            if (question && userAnswers[key] === question.correct_index) {
                correctAnswers++;
            }
        }
    });
    
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    // Update modal
    document.getElementById('finalScore').textContent = correctAnswers;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('accuracy').textContent = accuracy + '%';
    
    // Show modal
    document.getElementById('resultsModal').classList.add('visible');
}

// Restart quiz
function restartQuiz() {
    currentSlideIndex = 0;
    userAnswers = {};
    answeredQuestions = 0;
    
    document.getElementById('resultsModal').classList.remove('visible');
    
    updateProgress();
    displaySlide();
    updateNavigationButtons();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    }
});

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', loadQuizData);

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed
});

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
