let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    // Update navigation buttons
    document.getElementById('prev-btn').style.visibility = index === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').style.visibility = index === slides.length - 1 ? 'hidden' : 'visible';
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    // Reset any feedback boxes if needed
    document.querySelectorAll('.feedback-box').forEach(box => {
        box.style.display = 'none';
        box.innerHTML = '';
    });
}

// Global functions for activities
function checkAnswer(id, isCorrect, feedbackText, targetBoxId) {
    const feedbackBox = document.getElementById(targetBoxId || `feedback-${id}`);
    feedbackBox.innerHTML = feedbackText;
    feedbackBox.style.display = 'block';

    if (isCorrect) {
        feedbackBox.className = 'feedback-box feedback-correct';
    } else {
        feedbackBox.className = 'feedback-box feedback-incorrect';
    }
}

function showPopup(text, targetId = 'explorer-popup') {
    const popup = document.getElementById(targetId);
    popup.innerHTML = text;
    popup.style.display = 'block';
    popup.className = 'feedback-box feedback-correct'; // Use correct styling for neutral info
}

// Activity logic for ordering steps
let currentStep = 1;
function checkStep(stepNum, totalSteps, feedbackId) {
    const item = document.querySelector(`[data-step="${stepNum}"]`);
    const feedback = document.getElementById(feedbackId);

    if (stepNum === currentStep) {
        item.classList.add('correct');
        const numCircle = item.querySelector('.order-number');
        if (numCircle) numCircle.style.background = '#28a745';
        currentStep++;

        if (currentStep > totalSteps) {
            feedback.innerHTML = '✨ ¡Excelente! Has completado el proceso correctamente.';
            feedback.style.display = 'block';
            feedback.className = 'feedback-box feedback-correct';
        }
    } else {
        feedback.innerHTML = '❌ Ese no es el orden correcto. ¡Prueba de nuevo!';
        feedback.style.display = 'block';
        feedback.className = 'feedback-box feedback-incorrect';
        setTimeout(() => { feedback.style.display = 'none'; }, 2000);
    }
}

function resetOrdering(totalSteps, feedbackId) {
    currentStep = 1;
    document.querySelectorAll('.order-item').forEach(item => {
        item.classList.remove('correct');
        const numCircle = item.querySelector('.order-number');
        if (numCircle) numCircle.style.background = '#244b5a';
    });
    document.getElementById(feedbackId).style.display = 'none';
}

// Initialize on load
window.onload = () => {
    showSlide(0);
};
