let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const progressBar = document.querySelector('.progress-bar-fill');

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
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Arrow visibility
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    if (prevBtn) prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = currentSlide === totalSlides - 1 ? 'hidden' : 'visible';
}

window.nextSlide = function () {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

window.prevSlide = function () {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

// Activity: Multiple Choice
window.checkOption = function (btn, isCorrect, feedbackId, customSuccess, customError) {
    const feedback = document.getElementById(feedbackId);
    const container = btn.parentElement;
    const buttons = container.querySelectorAll('.option-btn');

    buttons.forEach(b => b.classList.remove('correct', 'incorrect'));

    if (isCorrect) {
        btn.classList.add('correct');
        feedback.innerText = customSuccess || "¡Excelente! Respuesta correcta. ✨";
        feedback.className = "feedback success";
    } else {
        btn.classList.add('incorrect');
        feedback.innerText = customError || "Vaya, esa no es. ¡Inténtalo de nuevo! 💪";
        feedback.className = "feedback error";
    }
}

// Activity: Order Steps
let selectedOrder = [];
window.addToOrder = function (btn, stepValue, correctOrder, feedbackId) {
    const feedback = document.getElementById(feedbackId);

    if (btn.classList.contains('selected')) return;

    btn.classList.add('selected');
    selectedOrder.push(stepValue);

    if (selectedOrder.length === correctOrder.length) {
        const isCorrect = selectedOrder.every((val, index) => val === correctOrder[index]);
        if (isCorrect) {
            feedback.innerText = "¡Perfecto! Has ordenado los pasos del Minuet correctamente. 🕺💃";
            feedback.className = "feedback success";
        } else {
            feedback.innerText = "El orden no es correcto. ¡Haz clic en 'Reiniciar' para probar otra vez!";
            feedback.className = "feedback error";
        }
    }
}

window.resetOrder = function (containerId, feedbackId) {
    selectedOrder = [];
    const feedback = document.getElementById(feedbackId);
    feedback.className = "feedback";
    feedback.innerText = "";

    const buttons = document.querySelectorAll(`#${containerId} .step-btn`);
    buttons.forEach(b => b.classList.remove('selected'));
}

// Activity: Exploration
window.showExploreInfo = function (pointId, text) {
    const infoBox = document.getElementById('explore-info-box');
    if (!infoBox) return;

    infoBox.innerText = text;
    infoBox.style.display = 'block';

    document.querySelectorAll('.map-point').forEach(p => {
        p.style.backgroundColor = 'var(--primary-orange)';
        p.style.transform = 'scale(1)';
    });

    const activePoint = document.getElementById(pointId);
    if (activePoint) {
        activePoint.style.backgroundColor = 'var(--primary-yellow)';
        activePoint.style.transform = 'scale(1.2)';
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Restart presentation
window.restartGuide = function () {
    currentSlide = 0;
    updateSlide();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
});
