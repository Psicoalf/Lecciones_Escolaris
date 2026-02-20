const slides = [
    {
        id: 'portada',
        title: 'PROYECTOS PRODUCTIVOS',
        subtitle: 'Lección 5 | Productividad y Desarrollo',
        grade: '6° Primaria',
        type: 'cover',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
        content: '¡Es hora de actuar! Hoy aprenderemos a proponer soluciones reales a los desafíos de nuestra comunidad mediante proyectos creativos.'
    },
    {
        id: 'objetivos',
        title: 'Nuestros Objetivos',
        type: 'list',
        items: [
            'Plantear opciones de solución a problemas comunitarios.',
            'Analizar información disponible para tomar decisiones.',
            'Reconocer situaciones críticas que podemos mejorar.'
        ]
    },
    {
        id: 'activacion',
        title: 'Observa tu alrededor',
        type: 'activation',
        question: '¿Qué problema en tu comunidad te gustaría resolver hoy mismo?',
        content: 'Un proyecto productivo empieza identificando una necesidad que afecta a muchas personas.'
    },
    {
        id: 'palabras-clave',
        title: 'Herramientas de Mejora',
        type: 'keywords',
        keywords: [
            { term: 'Situación Crítica', def: 'Un problema urgente que requiere una solución rápida y efectiva.' },
            { term: 'Opciones de Solución', def: 'Diferentes caminos o ideas que podemos seguir para resolver algo.' },
            { term: 'Impacto Social', def: 'El beneficio positivo que nuestro proyecto deja en las personas.' }
        ]
    },
    {
        id: 'contenido-1',
        title: 'Identificar el Problema',
        type: 'content',
        content: 'No todos los problemas se resuelven igual. Primero debemos usar la **información disponible** (encuestas, noticias, observación) para entender qué está pasando realmente en nuestra comunidad antes de proponer una idea.'
    },
    {
        id: 'contenido-2',
        title: 'De la Idea a la Acción',
        type: 'content',
        content: 'Un proyecto es "productivo" cuando genera un resultado útil. Puede ser:<br>• **Productivo Social**: Limpiar un parque o ayudar a un refugio.<br>• **Productivo Económico**: Crear jabones artesanales para vender y mejorar la escuela.'
    },
    {
        id: 'exploracion',
        title: 'Pasos del Proyecto',
        type: 'exploration',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
        hotspots: [
            { text: 'Diagnóstico: Investigar el problema a fondo.', top: '20%', left: '25%' },
            { text: 'Planificación: Elegir la mejor solución y los materiales.', top: '50%', left: '70%' },
            { text: 'Ejecución: ¡Poner manos a la obra!', top: '80%', left: '40%' }
        ]
    },
    {
        id: 'actividad-1',
        title: 'Analizando Soluciones',
        type: 'quiz',
        question: 'Si en mi comunidad hay mucha basura en las calles, ¿cuál es la mejor opción de solución inicial?',
        options: [
            { text: 'Quejarse en redes sociales.', correct: false, feedback: 'Eso no limpia las calles. ¡Pensemos en algo más productivo!' },
            { text: 'Organizar una jornada de limpieza y reciclaje.', correct: true, feedback: '¡Excelente! Estás planteando una solución directa al problema.' },
            { text: 'Esperar a que llueva y se la lleve.', correct: false, feedback: 'Eso solo causa inundaciones. ¡Inténtalo de nuevo!' }
        ]
    },
    {
        id: 'juego',
        title: 'Ciclo del Proyecto',
        type: 'sorting',
        question: 'Ordena el proceso para crear tu proyecto productivo:',
        steps: [
            { id: 1, text: 'Leer información sobre el problema' },
            { id: 2, text: 'Brainstorming de ideas' },
            { id: 3, text: 'Elegir el proyecto más viable' },
            { id: 4, text: 'Presentar los resultados' }
        ],
        currentOrder: [],
        correctOrder: [1, 2, 3, 4]
    },
    {
        id: 'aplicacion',
        title: 'Caso Crítico',
        type: 'scenario',
        scenario: 'Hay muchos perros sin hogar en tu zona. Tienes 50 quetzales y mucha energía. ¿Qué solución tiene más impacto?',
        options: [
            { text: 'Comprar comida y hacer carteles de adopción.', correct: true, feedback: '¡Muy bien! Usas tus recursos para una solución inmediata y una a largo plazo.' },
            { text: 'Comprar una mascota nueva para mí.', correct: false, feedback: 'Eso no ayuda al problema de la comunidad. ¡Reintenta!' }
        ]
    },
    {
        id: 'repaso',
        title: 'Repaso Final',
        type: 'quiz',
        question: '¿Qué nos ayuda a decidir qué proyecto es mejor?',
        options: [
            { text: 'Lanzar una moneda al aire.', correct: false, feedback: '¡No! Un emprendedor decide con datos. ¡Prueba otra!' },
            { text: 'Analizar la información y los recursos disponibles.', correct: true, feedback: '¡Exacto! Así aseguramos que el proyecto funcione.' },
            { text: 'Hacer el que sea más fácil de todos.', correct: false, feedback: 'A veces lo más fácil no ayuda al problema crítico. ¡Reintenta!' }
        ]
    },
    {
        id: 'metacognicion',
        title: 'Reflexiona',
        type: 'reflection',
        questions: [
            '¿Qué problema de mi comunidad me motiva a actuar?',
            '¿Qué información necesito para empezar mi idea?',
            '¿Cómo me siento al ayudar a los demás?'
        ]
    },
    {
        id: 'cierre',
        title: '¡Gestor de Cambio!',
        type: 'closing',
        message: 'Has terminado la Lección 5. Tienes las herramientas para transformar tu entorno. ¡Atrévete a liderar un proyecto!'
    }
];

let currentSlideIndex = 0;
let isTransitioning = false;

const slideContainer = document.getElementById('slide-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');

function init() {
    renderSlide();
    updateNav();

    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0 && !isTransitioning) {
            currentSlideIndex--;
            renderSlide();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1 && !isTransitioning) {
            currentSlideIndex++;
            renderSlide();
        }
    });

    document.getElementById('feedback-btn').addEventListener('click', hideFeedback);
}

function renderSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    updateNav();

    const slideData = slides[currentSlideIndex];
    document.getElementById('lesson-topic').innerText = slideData.title;

    const oldSlide = slideContainer.querySelector('.slide');
    if (oldSlide) {
        oldSlide.classList.remove('active');
        oldSlide.classList.add('exit');
        setTimeout(() => oldSlide.remove(), 500);
    }

    const slideEl = document.createElement('div');
    slideEl.className = 'slide';
    slideEl.id = `slide-${slideData.id}`;

    let html = '';

    switch (slideData.type) {
        case 'cover':
            html = `
                <div class="badge">${slideData.subtitle}</div>
                <h1 style="color: var(--primary-orange)">${slideData.title}</h1>
                <p style="font-weight: bold; color: var(--primary-blue)">${slideData.grade}</p>
                <img src="${slideData.image}" class="slide-img" alt="Cover">
                <div class="accent-box" style="text-align: center">${slideData.content}</div>
            `;
            break;
        case 'list':
            html = `
                <h2>${slideData.title}</h2>
                <div style="text-align: left; width: 100%; max-width: 600px;">
                    ${slideData.items.map(item => `<div class="accent-box"><strong>•</strong> ${item}</div>`).join('')}
                </div>
            `;
            break;
        case 'activation':
            html = `
                <h2>${slideData.title}</h2>
                <p class="accent-box" style="font-size: 1.3rem; border-left-color: var(--primary-gold)">${slideData.question}</p>
                <p>${slideData.content}</p>
                <div style="font-size: 3rem">🏘️</div>
            `;
            break;
        case 'keywords':
            html = `
                <h2>${slideData.title}</h2>
                <div class="options-grid" style="grid-template-columns: 1fr; max-width: 800px;">
                    ${slideData.keywords.map(k => `
                        <div class="accent-box" style="margin: 5px 0">
                            <strong style="color: var(--primary-orange)">${k.term}:</strong> ${k.def}
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'content':
            html = `
                <h2>${slideData.title}</h2>
                <div class="accent-box" style="font-size: 1.2rem; line-height: 1.8;">
                    ${slideData.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}
                </div>
                <div style="font-size: 4rem">🌱</div>
            `;
            break;
        case 'exploration':
            html = `
                <h2>${slideData.title}</h2>
                <p>Haz clic en los puntos para explorar</p>
                <div style="position: relative; width: 100%; max-width: 500px;">
                    <img src="${slideData.image}" class="slide-img" style="width: 100%; margin: 0">
                    ${slideData.hotspots.map((h, i) => `
                        <div class="hotspot" style="top: ${h.top}; left: ${h.left};" onclick="showFeedback('¡Explorado!', '${h.text}', 'Genial')">
                            ${i + 1}
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'quiz':
        case 'scenario':
            const gridStyle = slideData.options.length === 3 ? 'grid-template-columns: 1fr; max-width: 500px;' : '';
            html = `
                <h2>${slideData.title}</h2>
                <p style="font-weight: 600">${slideData.question || slideData.scenario}</p>
                <div class="options-grid" style="${gridStyle}">
                    ${slideData.options.map(opt => `
                        <button class="option-btn" onclick="checkAnswer(${opt.correct}, '${opt.feedback.replace(/'/g, "\\'")}')">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            `;
            break;
        case 'sorting':
            html = `
                <h2>${slideData.title}</h2>
                <p>${slideData.question}</p>
                <div id="sorting-area" style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 500px;">
                    ${slideData.steps.map(step => `
                        <button class="option-btn step-btn" data-id="${step.id}" onclick="handleSort(${step.id})">
                            ${step.text}
                        </button>
                    `).join('')}
                </div>
                <p id="sort-hint" style="margin-top: 15px; font-size: 0.9rem; color: var(--primary-orange)">Haz clic en los pasos en el orden correcto</p>
                <button class="option-btn" style="margin-top: 10px; border-color: var(--primary-gold)" onclick="resetSort()">Reiniciar Orden</button>
            `;
            break;
        case 'reflection':
            html = `
                <h2>${slideData.title}</h2>
                <div style="text-align: left; width: 100%; max-width: 600px;">
                    ${slideData.questions.map(q => `<p class="accent-box" style="background: white; border: 1px solid #ccc;">${q}</p>`).join('')}
                </div>
                <div style="font-size: 3rem">💡</div>
            `;
            break;
        case 'closing':
            html = `
                <div style="font-size: 5rem">🤝</div>
                <h1 style="color: var(--primary-gold)">${slideData.title}</h1>
                <p style="font-size: 1.5rem">${slideData.message}</p>
                <div class="badge" style="background: var(--primary-orange); color: white; padding: 10px 30px; font-size: 1.2rem">¡Líder de Proyectos Escolaris!</div>
            `;
            break;
    }

    slideEl.innerHTML = html;
    slideContainer.appendChild(slideEl);

    setTimeout(() => {
        slideEl.classList.add('active');
        setTimeout(() => {
            isTransitioning = false;
            updateNav();
        }, 500);
    }, 50);

    progressBar.style.width = `${((currentSlideIndex + 1) / slides.length) * 100}%`;
}

function updateNav() {
    prevBtn.disabled = currentSlideIndex === 0 || isTransitioning;
    nextBtn.disabled = currentSlideIndex === slides.length - 1 || isTransitioning;
}

window.checkAnswer = function (isCorrect, feedback) {
    if (isTransitioning) return;
    if (isCorrect) {
        showFeedback('¡Excelente!', feedback, 'Continuar');
    } else {
        showFeedback('¡Casi lo tienes!', feedback, 'Reintentar');
    }
};

let currentSortOrder = [];
window.handleSort = function (id) {
    if (isTransitioning) return;
    const slideData = slides[currentSlideIndex];
    if (currentSortOrder.includes(id)) return;

    currentSortOrder.push(id);
    const btn = document.querySelector(`.step-btn[data-id="${id}"]`);
    btn.style.opacity = '0.5';
    btn.innerHTML = `${currentSortOrder.length}. ${btn.innerText}`;

    if (currentSortOrder.length === slideData.correctOrder.length) {
        const isCorrect = currentSortOrder.every((val, index) => val === slideData.correctOrder[index]);
        if (isCorrect) {
            showFeedback('¡Gran Trabajo!', 'Has ordenado correctamente el ciclo de un proyecto productivo.', 'Continuar');
        } else {
            showFeedback('Orden Sugerido', 'Primero investigamos, luego ideamos la solución. ¡Inténtalo otra vez!', 'Reintentar');
            resetSort();
        }
    }
};

window.resetSort = function () {
    currentSortOrder = [];
    renderSlide();
};

window.showFeedback = function (title, text, btnText) {
    document.getElementById('feedback-title').innerText = title;
    document.getElementById('feedback-text').innerText = text;
    document.getElementById('feedback-btn').innerText = btnText;

    const icon = document.getElementById('feedback-icon');
    if (title.includes('Excelente') || title.includes('Gran') || title.includes('Explorado')) {
        icon.innerHTML = '<div style="font-size: 4rem">✨</div>';
    } else {
        icon.innerHTML = '<div style="font-size: 4rem">🧐</div>';
    }

    feedbackOverlay.classList.remove('hidden');
};

function hideFeedback() {
    if (isTransitioning) return;
    const btnText = document.getElementById('feedback-btn').innerText;
    feedbackOverlay.classList.add('hidden');

    if (btnText === 'Continuar') {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            renderSlide();
        }
    }
}

init();
