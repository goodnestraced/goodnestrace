let currentLang = 'es';
let translations = {};

export async function initI18n() {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['es', 'en'].includes(savedLang)) { /* Recuerda agregar los idiomas que importes */
        currentLang = savedLang;
    }
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = currentLang;
        selector.addEventListener('change', async (e) => {
            currentLang = e.target.value;
            localStorage.setItem('language', currentLang);
            await loadTranslations(currentLang);
            updatePageTranslations();
        });
    }
    await loadTranslations(currentLang);
    updatePageTranslations();
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`languages/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        translations = {};
    }
}

export function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[key];
                if (el.value === '') el.value = translations[key]; // para campos vacíos
            } else {
                el.innerText = translations[key];
            }
        }
    });
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

window.updatePageTranslations = updatePageTranslations;
