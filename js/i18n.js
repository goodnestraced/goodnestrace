const translations = {
    es: {
        "nav-home": "Inicio",
        "nav-services": "Servicios",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "hero-title": "AX STUDIOS",
        "hero-desc": "Configuración de plugins de Minecraft, servidores de Discord y desarrollo de software con amplia experiencia para tus necesidades.",
        "services-title": "Servicios",
        "services-dev-title": "Desarrollo",
        "services-dev-desc": "Creación de bots, configuraciones de servidores y soluciones personalizadas.",
        "services-prog-title": "Programación",
        "services-prog-desc": "Código limpio, eficiente y bien documentado para cualquier proyecto.",
        "projects-title": "Proyectos",
        "contact-title": "Contacto",
        "copy-discord": "Copiar Discord",
        "discord-copied": "Copiado exitosamente!"
    },
    en: {
        "nav-home": "Home",
        "nav-services": "Services",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "hero-title": "AX STUDIOS",
        "hero-desc": "Minecraft plugin config, Discord servers, and software development with extensive experience for your needs.",
        "services-title": "Services",
        "services-dev-title": "Development",
        "services-dev-desc": "Creation of bots, server configurations and custom solutions.",
        "services-prog-title": "Programming",
        "services-prog-desc": "Clean, efficient and well-documented code for any project.",
        "projects-title": "Projects",
        "contact-title": "Contact",
        "copy-discord": "Copy Discord",
        "discord-copied": "Copied!"
    },
    rs: {
        "nav-home": "Дом",
        "nav-services": "Услуги",
        "nav-projects": "Проекты",
        "nav-contact": "Контакт",
        "hero-title": "AX STUDIOS",
        "hero-desc": "Настройка плагинов Minecraft, Discord серверов и разработка программного обеспечения с большим опытом для ваших нужд.",
        "services-title": "Услуги",
        "services-dev-title": "Разработка",
        "services-dev-desc": "Создание ботов, конфигураций серверов и индивидуальных решений.",
        "services-prog-title": "Программирование",
        "services-prog-desc": "Чистый, эффективный и хорошо документированный код для любого проекта.",
        "projects-title": "Проекты",
        "contact-title": "Контакт",
        "copy-discord": "Копировать Discord",
        "discord-copied": "Скопировано!"
    },
    fr: {
        "nav-home": "Accueil",
        "nav-services": "Services",
        "nav-projects": "Projets",
        "nav-contact": "Contact",
        "hero-title": "AX STUDIOS",
        "hero-desc": "Configuration de plugins Minecraft, serveurs Discord et développement logiciel avec une vaste expérience pour vos besoins.",
        "services-title": "Services",
        "services-dev-title": "Développement",
        "services-dev-desc": "Création de bots, configurations de serveurs et solutions personnalisées.",
        "services-prog-title": "Programmation",
        "services-prog-desc": "Code propre, efficace et bien documenté pour tout projet.",
        "projects-title": "Projets",
        "contact-title": "Contact",
        "copy-discord": "Copier Discord",
        "discord-copied": "Copié !"
    }
};

let currentLang = 'es';

export async function initI18n() {
    // Recuperar idioma guardado
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = currentLang;
        selector.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('language', currentLang);
            updatePageTranslations();
        });
    }
    updatePageTranslations();
}

export function updatePageTranslations() {
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
    // También traducir los enlaces del menú (data-key se mantiene para compatibilidad)
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
}

// Exponer función para ser usada desde router
window.updatePageTranslations = updatePageTranslations;