import Router from './router.js';
import { initLanyard } from './lanyard.js';
import { initMusic } from './music.js';
import { initI18n, updatePageTranslations } from './i18n.js';
import { initParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', async () => {
    initParticles('bg-canvas');
    await initI18n();
    const router = new Router();
    router.init();
    initLanyard();
    initMusic();

    // Mobile menu creation
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'fixed inset-0 z-50 glass-nav flex flex-col items-center justify-center space-y-8 text-2xl font-bold transform transition-transform duration-300 translate-x-full md:hidden';
    mobileMenu.innerHTML = `
        <button id="close-mobile-menu" class="absolute top-6 right-6 text-3xl">&times;</button>
        <a href="#/" data-link data-i18n="nav-home">Inicio</a>
        <a href="#/services" data-link data-i18n="nav-services">Servicios</a>
        <a href="#/projects" data-link data-i18n="nav-projects">Proyectos</a>
        <a href="#/contact" data-link data-i18n="nav-contact">Contacto</a>
    `;
    document.body.appendChild(mobileMenu);
    const closeMobile = () => mobileMenu.classList.add('translate-x-full');
    const openMobile = () => mobileMenu.classList.remove('translate-x-full');
    mobileBtn.addEventListener('click', openMobile);
    document.getElementById('close-mobile-menu').addEventListener('click', closeMobile);
    mobileMenu.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', closeMobile);
    });
});
