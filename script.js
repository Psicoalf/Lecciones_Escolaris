const slides = [
    {
        id: 'portada',
        title: '¿QUÉ ES UN EMPRENDEDOR?',
        subtitle: 'Lección 3 | Productividad y Desarrollo',
        grade: '6° Primaria',
        type: 'cover',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', // Fallback URL
        content: '¡Bienvenido a tu viaje de innovación! Hoy descubriremos cómo transformar ideas en realidades para mejorar nuestra comunidad.'
    },
    {
        id: 'objetivos',
        title: 'Nuestros Objetivos',
        type: 'list',
        items: [
            'Entender qué es un emprendedor y su impacto.',
            'Identificar cómo innovar para mejorar la información de nuestra comunidad.',
            'Plantear mejoras creativas a procesos existentes.'
        ]
    },
    {
        id: 'activacion',
        title: 'Pensemos un poco...',
        type: 'activation',
        question: '¿Alguna vez has visto un problema en tu colonia y has pensado en cómo solucionarlo?',
        content: 'Un emprendedor no solo vende cosas, ¡soluciona problemas con creatividad!'
    },
    {
        id: 'palabras-clave',
        title: 'Palabras que debes conocer',
        type: 'keywords',
        keywords: [
            { term: 'Emprendedor', def: 'Persona que identifica una oportunidad e inicia un proyecto.' },
            { term: 'Innovación', def: 'Hacer algo nuevo o mejorar algo que ya existe de forma creativa.' },
            { term: 'Comunidad', def: 'El grupo de personas y el lugar donde vivimos y compartimos.' }
        ]
    },
    {
        id: 'contenido-1',
        title: '¿Qué hace un emprendedor?',
        type: 'content',
        content: 'Un emprendedor es como un explorador. Busca necesidades en su comunidad y piensa: "¿Cómo puedo hacer esto mejor?". Utiliza los recursos que tiene para crear soluciones que ayuden a los demás.'
    },
    {
        id: 'contenido-2',
        title: 'Innovar para Informar',
        type: 'content',
        content: 'Para mejorar nuestra comunidad, primero debemos conocerla. Los emprendedores modernos usan herramientas para recopilar información y proponen **innovaciones** (cambios novedosos) o **ampliaciones** (extender lo que ya funciona) para que todos estén mejor informados.'
    },
    {
        id: 'exploracion',
        title: 'Explora y Aprende',
        type: 'exploration',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
        hotspots: [
            { text: 'Información: Datos sobre nuestra comunidad.', top: '20%', left: '30%' },
            { text: 'Innovación: Nuevas ideas para compartir datos.', top: '50%', left: '70%' },
            { text: 'Registro: Anotar los cambios para mejorar.', top: '80%', left: '40%' }
        ]
    },
    {
        id: 'actividad-1',
        title: 'Actividad de Comprensión',
        type: 'quiz',
        question: 'Si decides crear una app para avisar a tus vecinos sobre los días de reciclaje, ¿qué estás haciendo?',
        options: [
            { text: 'Solo perdiendo el tiempo.', correct: false, feedback: '¡Piénsalo de nuevo! Estás resolviendo un problema.' },
            { text: 'Innovando para mejorar la información.', correct: true, feedback: '¡Exacto! Estás trayendo una solución nueva a una necesidad real.' },
            { text: 'Haciendo algo que no sirve.', correct: false, feedback: '¡Intenta otra vez! Ayudar a la comunidad siempre sirve.' }
        ]
    },
    {
        id: 'juego',
        title: '¡A Ordenar!',
        type: 'sorting',
        question: 'Ordena los pasos para un proyecto de innovación en tu comunidad:',
        steps: [
            { id: 1, text: 'Identificar un problema' },
            { id: 2, text: 'Idear una solución creativa' },
            { id: 3, text: 'Registrar la información' },
            { id: 4, text: 'Compartir los resultados' }
        ],
        currentOrder: [],
        correctOrder: [1, 2, 3, 4]
    },
    {
        id: 'aplicacion',
        title: 'Reto Práctico',
        type: 'scenario',
        scenario: 'En tu escuela, nadie sabe cuándo son los eventos deportivos. ¿Cómo podrías innovar para que la información llegue a todos?',
        options: [
            { text: 'Crear un mural interactivo con QR.', correct: true, feedback: '¡Excelente idea! Es una ampliación moderna y útil.' },
            { text: 'No hacer nada y esperar.', correct: false, feedback: 'Un emprendedor siempre toma la iniciativa. ¡Inténtalo!' }
        ]
    },
    {
        id: 'repaso',
        title: 'Repaso Final',
        type: 'quiz',
        question: '¿Qué es lo más importante de registrar innovaciones en la comunidad?',
        options: [
            { text: 'Tener muchos papeles.', correct: false, feedback: 'No es por el papel, es por el conocimiento. ¡Prueba de nuevo!' },
            { text: 'Aprender qué funciona y qué se puede mejorar.', correct: true, feedback: '¡Así es! El registro permite el crecimiento continuo.' },
            { text: 'Para que el profesor me ponga 10.', correct: false, feedback: 'Aunque es bueno sacar 10, el objetivo real es el impacto social. ¡Reintenta!' }
        ]
    },
    {
        id: 'metacognicion',
        title: 'Reflexiona',
        type: 'reflection',
        questions: [
            '¿Qué aprendí hoy sobre el emprendimiento?',
            '¿Cómo puedo aplicar esto en mi propia calle o escuela?',
            '¿Qué fue lo que más me sorprendió?'
        ]
    },
    {
        id: 'cierre',
        title: '¡Felicidades, Emprendedor!',
        type: 'closing',
        message: 'Has completado la lección. Ahora tienes la chispa de la innovación. ¡Sigue observando y creando!'
    }
];

let currentSlideIndex = 0;
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
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            renderSlide();
            updateNav();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            renderSlide();
            updateNav();
        }
    });

    document.getElementById('feedback-btn').addEventListener('click', hideFeedback);
}

function renderSlide() {
    const slideData = slides[currentSlideIndex];

    // Add transition effect
    const oldSlide = slideContainer.querySelector('.slide');
    if (oldSlide) {
        oldSlide.classList.remove('active');
        oldSlide.classList.add('exit');
        setTimeout(() => oldSlide.remove(), 500);
    }

    const slideEl = document.createElement('div');
    slideEl.className = 'slide';
    slideEl.id = `slide-${slideData.id}`;

    // Update header topic
    document.getElementById('lesson-topic').innerText = slideData.title;

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
                    ${slideData.items.map(item => `
                        <div class="accent-box">
                            <strong>•</strong> ${item}
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'activation':
            html = `
                <h2>${slideData.title}</h2>
                <p class="accent-box" style="font-size: 1.3rem; border-left-color: var(--primary-gold)">${slideData.question}</p>
                <p>${slideData.content}</p>
                <div style="font-size: 3rem">💡</div>
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
                    ${slideData.content}
                </div>
                <div style="font-size: 4rem">🚀</div>
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
            html = `
                <h2>${slideData.title}</h2>
                <p style="font-weight: 600">${slideData.question || slideData.scenario}</p>
                <div class="options-grid">
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
                <div style="font-size: 3rem">📝</div>
            `;
            break;

        case 'closing':
            html = `
                <div style="font-size: 5rem">🏆</div>
                <h1 style="color: var(--primary-gold)">${slideData.title}</h1>
                <p style="font-size: 1.5rem">${slideData.message}</p>
                <div class="badge" style="background: var(--primary-orange); color: white; padding: 10px 30px; font-size: 1.2rem">¡Sello de Inventor Escolares!</div>
            `;
            break;
    }

    slideEl.innerHTML = html;
    slideContainer.appendChild(slideEl);

    // Trigger transition
    setTimeout(() => slideEl.classList.add('active'), 50);

    // Update progress
    progressBar.style.width = `${((currentSlideIndex + 1) / slides.length) * 100}%`;
}

function updateNav() {
    prevBtn.disabled = currentSlideIndex === 0;
    // nextBtn.disabled = currentSlideIndex === slides.length - 1; // Always allow next for presentation
}

window.checkAnswer = function (isCorrect, feedback) {
    if (isCorrect) {
        showFeedback('¡Correcto!', feedback, 'Continuar');
    } else {
        showFeedback('¡Inténtalo de nuevo!', feedback, 'Reintentar');
    }
};

let currentSortOrder = [];
window.handleSort = function (id) {
    const slideData = slides[currentSlideIndex];
    if (currentSortOrder.includes(id)) return;

    currentSortOrder.push(id);
    const btn = document.querySelector(`.step-btn[data-id="${id}"]`);
    btn.style.opacity = '0.5';
    btn.innerHTML = `${currentSortOrder.length}. ${btn.innerText}`;

    if (currentSortOrder.length === slideData.correctOrder.length) {
        const isCorrect = currentSortOrder.every((val, index) => val === slideData.correctOrder[index]);
        if (isCorrect) {
            showFeedback('¡Bien hecho!', 'Has ordenado los pasos correctamente para un proyecto exitoso.', 'Siguiente');
        } else {
            showFeedback('Orden incorrecto', 'Parece que el orden no es el ideal. Un emprendedor primero reconoce el problema.', 'Reintentar');
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
    if (title.includes('Correcto') || title.includes('Bien')) {
        icon.innerHTML = '<div style="font-size: 4rem">🌟</div>';
        feedbackCard.style.borderColor = 'var(--primary-gold)';
    } else {
        icon.innerHTML = '<div style="font-size: 4rem">🤔</div>';
        feedbackCard.style.borderColor = 'var(--primary-red)';
    }

    feedbackOverlay.classList.remove('hidden');
};

function hideFeedback() {
    const btnText = document.getElementById('feedback-btn').innerText;
    feedbackOverlay.classList.add('hidden');

    if (btnText === 'Siguiente' || btnText === 'Continuar') {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            renderSlide();
            updateNav();
        }
    }
}

// Global scope for exploration hotspots
window.showFeedback = window.showFeedback;

init();
