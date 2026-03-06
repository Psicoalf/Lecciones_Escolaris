document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    let currentSlide = 0;

    // --- Navigation ---
    const updateNavigation = () => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;

        // Progress update
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
    };

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateNavigation();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateNavigation();
        }
    });

    // --- Flip Cards (Slide 3) ---
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- Hotspots (Slide 7) ---
    const hotspots = document.querySelectorAll('.hotspot');
    const infoBubble = document.getElementById('info-bubble');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const info = hotspot.getAttribute('data-info');
            infoBubble.textContent = info;
            infoBubble.style.backgroundColor = 'var(--naranja)';
            setTimeout(() => {
                infoBubble.style.backgroundColor = 'var(--azul-oscuro)';
            }, 500);
        });
    });

    // --- Quiz Logic (Generic for Slide 8 and 10) ---
    const setupQuiz = (containerId, feedbackId) => {
        const container = document.getElementById(containerId);
        const feedback = document.getElementById(feedbackId);
        const feedbackText = feedback.querySelector('.feedback-text');
        const retryBtn = feedback.querySelector('.retry-btn');
        const options = container.querySelectorAll('.option-btn');

        options.forEach(option => {
            option.addEventListener('click', () => {
                const isCorrect = option.getAttribute('data-correct') === 'true';

                // Disable all options
                options.forEach(btn => btn.disabled = true);

                if (isCorrect) {
                    option.classList.add('correct');
                    feedback.classList.remove('hidden');
                    feedback.className = 'feedback success';
                    feedbackText.textContent = "✅ ¡Exacto! Las TIC nos abren una ventana infinita al conocimiento y personalizan nuestra forma de aprender.";
                    retryBtn.classList.add('hidden');
                } else {
                    option.classList.add('wrong');
                    feedback.classList.remove('hidden');
                    feedback.className = 'feedback error';
                    feedbackText.textContent = "❌ No es la respuesta indicada. Recuerda que el enfoque de esta lección es el potencial educativo de la tecnología.";
                    retryBtn.classList.remove('hidden');
                }
            });
        });

        retryBtn.addEventListener('click', () => {
            options.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'wrong');
            });
            feedback.classList.add('hidden');
        });
    };

    setupQuiz('quiz-1', 'feedback-1');
    setupQuiz('quiz-2', 'feedback-2');

    // --- ABP Game (Slide 9) ---
    let chosenSteps = [];
    const correctOrder = ["1", "2", "3"];
    const gameButtons = document.querySelectorAll('.step-btn');
    const resultDisplay = document.getElementById('chosen-steps');
    const gameFeedback = document.getElementById('game-feedback');
    const gameFeedbackText = gameFeedback.querySelector('.feedback-text');

    gameButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (chosenSteps.includes(btn.textContent)) return;

            chosenSteps.push(btn.textContent);
            const stepId = btn.getAttribute('data-step');
            btn.disabled = true;
            btn.style.opacity = "0.5";

            resultDisplay.textContent = chosenSteps.join(" ➔ ");

            if (chosenSteps.length === 3) {
                checkGameResult();
            }
        });
    });

    function checkGameResult() {
        const userOrder = Array.from(document.querySelectorAll('.step-btn')).filter(b => chosenSteps.includes(b.textContent)).map(b => b.getAttribute('data-step'));
        // Re-mapping based on selection order
        const actualOrder = chosenSteps.map(text => {
            return Array.from(gameButtons).find(b => b.textContent === text).getAttribute('data-step');
        });

        const isCorrect = JSON.stringify(actualOrder) === JSON.stringify(correctOrder);

        gameFeedback.classList.remove('hidden');
        if (isCorrect) {
            gameFeedback.className = "feedback success";
            gameFeedbackText.textContent = "⭐ ¡Perfecto! Ese es el camino: entender la necesidad, aprender la técnica y aplicarla al mundo real.";
            gameFeedback.querySelector('.retry-btn').classList.add('hidden');
        } else {
            gameFeedback.className = "feedback error";
            gameFeedbackText.textContent = "😟 El orden no es el correcto. Para aprovechar la tecnología debemos seguir un proceso de aprendizaje lógico. ¡Intenta de nuevo!";
            gameFeedback.querySelector('.retry-btn').classList.remove('hidden');
        }
    }

    window.resetGame = () => {
        chosenSteps = [];
        resultDisplay.textContent = "...";
        gameButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = "1";
        });
        gameFeedback.classList.add('hidden');
    };

    // --- Mini Quiz (Slide 11) ---
    const miniQuizzes = document.querySelectorAll('.quiz-item');
    miniQuizzes.forEach(item => {
        const buttons = item.querySelectorAll('.mini-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const isCorrect = btn.getAttribute('data-answer') === 'true';

                // Clear group
                buttons.forEach(b => b.classList.remove('selected-correct', 'selected-wrong'));

                if (isCorrect) {
                    btn.classList.add('selected-correct');
                } else {
                    btn.classList.add('selected-wrong');
                    setTimeout(() => {
                        btn.classList.remove('selected-wrong');
                    }, 1000);
                }
            });
        });
    });

    // Initialize
    updateNavigation();
});
