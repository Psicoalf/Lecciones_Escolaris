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

window.checkSimpleOption = function (btn, isCorrect, feedbackId, successTxt, errorTxt) {
    const feedback = document.getElementById(feedbackId);
    const buttons = btn.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(b => b.classList.remove('correct', 'incorrect'));

    if (isCorrect) {
        btn.classList.add('correct');
        feedback.innerText = successTxt || "¡Muy bien! Respuesta correcta. ✨";
        feedback.className = "feedback success";
    } else {
        btn.classList.add('incorrect');
        feedback.innerText = errorTxt || "No es correcto. ¡Sigue intentando! 💪";
        feedback.className = "feedback error";
    }
}

window.showPointInfo = function (pointId, infoId, text) {
    const infoBox = document.getElementById(infoId);
    if (!infoBox) return;
    infoBox.innerText = text;
    infoBox.style.display = 'block';

    document.querySelectorAll('.map-point').forEach(p => p.style.backgroundColor = 'var(--primary-blue)');
    const act = document.getElementById(pointId);
    if (act) act.style.backgroundColor = 'var(--primary-orange)';
}

window.restartPresentation = function () {
    currentSlide = 0;
    updateSlide();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

document.addEventListener('DOMContentLoaded', updateSlide);
