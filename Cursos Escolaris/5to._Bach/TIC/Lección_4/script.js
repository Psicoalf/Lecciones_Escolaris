let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const slidesWrapper = document.querySelector('.slides-wrapper');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');

function updateNavigation() {
    // Actualizar posición de las slides
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Visibilidad de botones
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    // Barra de progreso
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Reiniciar animaciones de la slide activa
    const activeSlide = document.querySelectorAll('.slide')[currentSlide];
    const card = activeSlide.querySelector('.content-card');
    if (card) {
        card.classList.remove('fade-in');
        void card.offsetWidth; // Trigger reflow
        card.classList.add('fade-in');
    }
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateNavigation();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateNavigation();
    }
});

// Actividades
function checkMultipleChoice(btn, isCorrect, feedbackId, retryId) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('.opt-btn');
    const feedback = document.getElementById(feedbackId);
    const retry = document.getElementById(retryId);
    
    // Bloquear otros botones
    buttons.forEach(b => b.style.pointerEvents = 'none');
    
    if (isCorrect) {
        btn.classList.add('correct');
        feedback.textContent = "¡Excelente! Has comprendido el concepto perfectamente. 💡";
        feedback.className = "feedback-msg success fade-in";
        feedback.classList.remove('hidden');
        if (retry) retry.classList.add('hidden');
    } else {
        btn.classList.add('wrong');
        feedback.textContent = "¡Oh! No es la opción correcta. Recuerda que los algoritmos son pasos específicos para resolver algo. Inténtalo de nuevo. 👇";
        feedback.className = "feedback-msg error fade-in";
        feedback.classList.remove('hidden');
        if (retry) retry.classList.remove('hidden');
    }
}

function retryActivity(containerId, feedbackId, retryId) {
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('.opt-btn');
    const feedback = document.getElementById(feedbackId);
    const retry = document.getElementById(retryId);
    
    buttons.forEach(b => {
        b.classList.remove('correct', 'wrong');
        b.style.pointerEvents = 'auto';
    });
    
    feedback.classList.add('hidden');
    retry.classList.add('hidden');
}

// Juego de Ordenar (Algoritmo de hacer un Sandwich o similar)
let currentStep = 1;
const totalSteps = 4;
function checkStep(btn, stepNum, gameFeedbackId) {
    const feedback = document.getElementById(gameFeedbackId);
    
    if (stepNum === currentStep) {
        btn.classList.add('correct');
        // Guardamos el texto original si no existe
        if (!btn.dataset.original) btn.dataset.original = btn.innerHTML;
        
        // Formateamos el texto del botón
        const baseText = btn.dataset.original.includes(':') ? btn.dataset.original.split(': ')[1] : btn.dataset.original;
        btn.innerHTML = `✅ Paso ${stepNum}: ${baseText}`;
        btn.style.pointerEvents = 'none';
        currentStep++;
        
        if (currentStep > totalSteps) {
            feedback.textContent = "¡Increíble! Has ordenado el algoritmo correctamente. ¡Eres un maestro de la lógica! 🏆";
            feedback.className = "game-result success fade-in";
            feedback.classList.remove('hidden');
        }
    } else {
        btn.classList.add('wrong');
        feedback.textContent = "¡Ups! Ese no es el paso siguiente. Analiza la lógica del algoritmo y vuelve a intentar. 🧐";
        feedback.className = "game-result error fade-in";
        feedback.classList.remove('hidden');
        setTimeout(() => {
            btn.classList.remove('wrong');
            feedback.classList.add('hidden');
        }, 2000);
    }
}

function resetGame(containerId, gameFeedbackId) {
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('.step-order');
    const feedback = document.getElementById(gameFeedbackId);
    
    buttons.forEach(b => {
        b.classList.remove('correct', 'wrong');
        b.style.pointerEvents = 'auto';
        if (b.dataset.original) b.innerHTML = b.dataset.original;
    });
    
    currentStep = 1;
    feedback.classList.add('hidden');
}

// Explorador Visual
function explore(point) {
    const info = document.getElementById('explorer-info');
    const data = {
        1: "🔍 <b>Palabras Clave:</b> La base de toda búsqueda. Un buen algoritmo identifica los términos más relevantes de tu consulta.",
        2: "⭐ <b>PageRank:</b> El sistema que califica la autoridad de una web. Si muchos sitios de calidad te enlazan, Google te da más puntos.",
        3: "⚙️ <b>Optimización:</b> El uso de filtros mágicos (AND, OR, NOT) para encontrar exactamente lo que estás buscando."
    };
    
    info.innerHTML = data[point];
    info.classList.add('fade-in');
    setTimeout(() => info.classList.remove('fade-in'), 500);
}

// Inicialización
updateNavigation();
