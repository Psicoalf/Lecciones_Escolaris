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

// Matching Game Logic
let selectedLeft = null;

function setupMatchingGame() {
    const leftBtns = document.querySelectorAll('#col-icons .match-btn');
    const rightBtns = document.querySelectorAll('#col-desc .match-btn');

    if (!leftBtns.length) return;

    leftBtns.forEach(btn => {
        btn.onclick = () => {
            if (btn.classList.contains('matched')) return;
            leftBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedLeft = btn;
        };
    });

    rightBtns.forEach(btn => {
        btn.onclick = () => {
            if (btn.classList.contains('matched') || !selectedLeft) return;

            const targetType = btn.getAttribute('data-target');
            const sourceType = selectedLeft.getAttribute('data-type');

            if (targetType === sourceType) {
                btn.classList.add('matched');
                selectedLeft.classList.add('matched');
                selectedLeft.classList.remove('selected');
                selectedLeft = null;
                checkGameWin();
            } else {
                const feedbackGame = document.getElementById('feedback-game');
                feedbackGame.innerHTML = '❌ Intenta de nuevo. Relaciona el concepto correcto.';
                feedbackGame.style.display = 'block';
                feedbackGame.className = 'feedback-box feedback-incorrect';
                setTimeout(() => {
                    feedbackGame.style.display = 'none';
                }, 2000);
            }
        };
    });
}

function checkGameWin() {
    const matchedBtns = document.querySelectorAll('.match-btn.matched');
    const allBtns = document.querySelectorAll('.match-btn');
    if (matchedBtns.length === allBtns.length) {
        const feedbackGame = document.getElementById('feedback-game');
        feedbackGame.innerHTML = '🎉 ¡Excelente! Has corregido todos los vicios del lenguaje.';
        feedbackGame.style.display = 'block';
        feedbackGame.className = 'feedback-box feedback-correct';
        document.getElementById('retry-game').style.display = 'inline-block';
    }
}

function resetGame() {
    document.querySelectorAll('.match-btn').forEach(btn => {
        btn.classList.remove('matched', 'selected');
    });
    document.getElementById('feedback-game').style.display = 'none';
    document.getElementById('retry-game').style.display = 'none';
    selectedLeft = null;
}

// Initialize on load
window.onload = () => {
    showSlide(0);
    setupMatchingGame();
};
