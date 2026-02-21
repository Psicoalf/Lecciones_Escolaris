let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateNavigation() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'flex';
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateNavigation();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateNavigation();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateNavigation();
    if (index === 0) resetGame();
}

function showFeedback(id, message) {
    const box = document.getElementById('feedback-' + id);
    if (box) {
        box.textContent = message;
        box.style.display = 'block';
        box.className = 'feedback-box feedback-info';
    }
}

function showPopup(message) {
    const box = document.getElementById('explorer-popup');
    box.textContent = message;
    box.style.display = 'block';
    box.className = 'feedback-box feedback-info';
}

function checkAnswer(id, isCorrect, message, customBoxId = null) {
    const boxId = customBoxId || 'feedback-' + id;
    const box = document.getElementById(boxId);
    if (!box) return;
    box.textContent = message;
    box.style.display = 'block';
    box.className = isCorrect ? 'feedback-box feedback-correct' : 'feedback-box feedback-wrong';
}

// Matching Game Logic
let selectedType = null;
let selectedBtn = null;
const matchBtns = document.querySelectorAll('.match-btn');

matchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('matched')) return;

        // If it's a "source" button (left column)
        if (btn.dataset.type) {
            if (selectedBtn) selectedBtn.classList.remove('selected');
            selectedType = btn.dataset.type;
            selectedBtn = btn;
            btn.classList.add('selected');
        }
        // If it's a "target" button (right column)
        else if (btn.dataset.target) {
            if (!selectedType) {
                showGameFeedback('Primero selecciona un problema de la izquierda.', false);
                return;
            }
            if (btn.dataset.target === selectedType) {
                btn.classList.add('matched');
                selectedBtn.classList.add('matched');
                selectedBtn.classList.remove('selected');
                selectedType = null;
                selectedBtn = null;
                showGameFeedback('¡Correcto! Problema resuelto.', true);
                checkGameComplete();
            } else {
                showGameFeedback('Esa no es la solución correcta. ¡Intenta de nuevo!', false);
                selectedBtn.classList.remove('selected');
                selectedType = null;
                selectedBtn = null;
            }
        }
    });
});

function showGameFeedback(msg, isCorrect) {
    const fb = document.getElementById('feedback-game');
    if (!fb) return;
    fb.textContent = msg;
    fb.style.display = 'block';
    fb.className = isCorrect ? 'feedback-box feedback-correct' : 'feedback-box feedback-wrong';
}

function checkGameComplete() {
    const matchedCount = document.querySelectorAll('.match-btn.matched').length;
    if (matchedCount === matchBtns.length) {
        showGameFeedback('¡Excelente! Has optimizado todos los procesos. 🏆', true);
        const retryBtn = document.getElementById('retry-game');
        if (retryBtn) retryBtn.style.display = 'inline-block';
    }
}

function resetGame() {
    matchBtns.forEach(btn => btn.classList.remove('matched', 'selected'));
    const fb = document.getElementById('feedback-game');
    if (fb) fb.style.display = 'none';
    const retryBtn = document.getElementById('retry-game');
    if (retryBtn) retryBtn.style.display = 'none';
    selectedType = null;
    selectedBtn = null;
}

// Initialize navigation
updateNavigation();
