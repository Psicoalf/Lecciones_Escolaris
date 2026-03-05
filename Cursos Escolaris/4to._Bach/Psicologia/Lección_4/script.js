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
}

// Retroalimentación Proactiva
function showFeedback(idPrefix, message, type) {
    const feedbackBox = document.getElementById(`feedback-${idPrefix}`);
    feedbackBox.innerHTML = message;
    feedbackBox.style.display = 'block';
    feedbackBox.className = `feedback-box feedback-${type === 'info' ? 'correct' : type}`;
}

// Actividad Selección Múltiple
function checkMultipleChoice(id, isCorrect, feedbackText, targetBoxId) {
    const feedbackBox = document.getElementById(targetBoxId);
    feedbackBox.innerHTML = feedbackText;
    feedbackBox.style.display = 'block';

    if (isCorrect) {
        feedbackBox.className = 'feedback-box feedback-correct';
        // Ocultar botón reintento si existe
        const retryBtn = document.getElementById(`retry-${id}`);
        if(retryBtn) retryBtn.style.display = 'none';
    } else {
        feedbackBox.className = 'feedback-box feedback-incorrect';
        // Mostrar botón reintento si existe
        const retryBtn = document.getElementById(`retry-${id}`);
        if(retryBtn) retryBtn.style.display = 'inline-block';
    }
}

function resetMultipleChoice(id) {
    const feedbackBox = document.getElementById(`feedback-${id}`);
    feedbackBox.style.display = 'none';
    document.getElementById(`retry-${id}`).style.display = 'none';
}

// Exploración Visual
function showExplorer(text) {
    const panel = document.getElementById('explorer-display');
    panel.innerHTML = text;
    panel.classList.add('active-panel'); // Optional class for styling
}

// Juego de Relacionar (Matching Game)
let selectedAuthor = null;

function initMatchingGame() {
    const authorBtns = document.querySelectorAll('#authors-col .match-btn');
    const schoolBtns = document.querySelectorAll('#schools-col .match-btn');

    authorBtns.forEach(btn => {
        btn.onclick = () => {
            if (btn.classList.contains('matched')) return;
            authorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAuthor = btn;
        };
    });

    schoolBtns.forEach(btn => {
        btn.onclick = () => {
            if (btn.classList.contains('matched') || !selectedAuthor) return;

            const target = btn.getAttribute('data-target');
            const source = selectedAuthor.getAttribute('data-type');

            if (target === source) {
                btn.classList.add('matched');
                selectedAuthor.classList.add('matched');
                selectedAuthor.classList.remove('selected');
                selectedAuthor = null;
                checkMatchWin();
            } else {
                const feedback = document.getElementById('match-feedback');
                feedback.innerHTML = '❌ Relación incorrecta. ¡Inténtalo de nuevo!';
                feedback.style.display = 'block';
                feedback.className = 'feedback-box feedback-incorrect';
                setTimeout(() => {
                    if (feedback.className.includes('incorrect')) feedback.style.display = 'none';
                }, 2000);
            }
        };
    });
}

function checkMatchWin() {
    const matched = document.querySelectorAll('.match-btn.matched');
    const total = document.querySelectorAll('.match-btn');
    if (matched.length === total.length) {
        const feedback = document.getElementById('match-feedback');
        feedback.innerHTML = '🎉 ¡Impresionante! Has dominado a los autores y sus escuelas.';
        feedback.className = 'feedback-box feedback-correct';
        feedback.style.display = 'block';
        document.getElementById('match-retry').style.display = 'inline-block';
    }
}

function resetMatchGame() {
    document.querySelectorAll('.match-btn').forEach(btn => {
        btn.classList.remove('matched', 'selected');
    });
    document.getElementById('match-feedback').style.display = 'none';
    document.getElementById('match-retry').style.display = 'none';
    selectedAuthor = null;
}

// Repaso Final
function checkRepaso(btn, isCorrect, feedback) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('button');
    
    buttons.forEach(b => b.style.opacity = '0.5');
    btn.style.opacity = '1';
    
    if (isCorrect) {
        btn.style.backgroundColor = '#d4edda';
        btn.style.borderColor = '#28a745';
    } else {
        btn.style.backgroundColor = '#f8d7da';
        btn.style.borderColor = '#721c24';
        setTimeout(() => {
            btn.style.backgroundColor = 'white';
            btn.style.borderColor = '#244b5a';
            buttons.forEach(b => b.style.opacity = '1');
        }, 1500);
    }
}

// Inicialización
window.onload = () => {
    showSlide(0);
    initMatchingGame();
};
