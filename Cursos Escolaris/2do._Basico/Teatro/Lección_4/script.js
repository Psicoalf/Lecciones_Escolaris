let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const progressBar = document.querySelector('.progress-bar');
const totalSlides = slides.length;

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev-exit');
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index < currentSlide) {
            slide.classList.add('prev-exit');
        }
    });

    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;

    // Arrow visibility
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');

    if (prevBtn) prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = currentSlide === totalSlides - 1 ? 'hidden' : 'visible';
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

// Activity Handlers
function checkMultipleChoice(btn, isCorrect, feedbackId, successMsg, errorMsg) {
    const feedback = document.getElementById(feedbackId);
    const container = btn.parentElement;
    const options = container.querySelectorAll('.option-btn');

    options.forEach(opt => opt.classList.remove('correct', 'incorrect'));

    if (isCorrect) {
        btn.classList.add('correct');
        feedback.innerText = "⭐ " + successMsg;
        feedback.className = "feedback success";
    } else {
        btn.classList.add('incorrect');
        feedback.innerText = "❌ " + errorMsg;
        feedback.className = "feedback error";
    }
}

function showMapInfo(pointId, text, displayId) {
    const infoDisplay = document.getElementById(displayId);
    infoDisplay.innerText = text;
    infoDisplay.style.display = 'block';

    // Reset all points in the same container
    const container = document.getElementById(pointId).parentElement;
    container.querySelectorAll('.map-point').forEach(p => {
        p.style.backgroundColor = 'var(--primary-orange)';
        p.style.transform = 'scale(1)';
    });

    const activePoint = document.getElementById(pointId);
    activePoint.style.backgroundColor = 'var(--primary-yellow)';
    activePoint.style.transform = 'scale(1.3)';
}

function resetActivity() {
    document.querySelectorAll('.feedback').forEach(f => {
        f.style.display = 'none';
        f.innerText = '';
    });
    document.querySelectorAll('.option-btn').forEach(b => {
        b.classList.remove('correct', 'incorrect');
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
});
