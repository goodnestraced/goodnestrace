import Router from './router.js';
import { initLanyard } from './lanyard.js';
import { initMusic } from './music.js';
import { initI18n } from './i18n.js';
import { initParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Fondo de partículas
    initParticles('bg-canvas');
    
    // Internacionalización (espera a que cargue)
    await initI18n();
    
    // Enrutador
    const router = new Router();
    router.init();
    
    // Estado de Discord (WebSocket)
    initLanyard();
    
    // Música de fondo
    initMusic();
    
    // Menú móvil dinámico
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'fixed inset-0 z-50 glass-nav flex flex-col items-center justify-center space-y-8 text-2xl font-bold transform transition-transform duration-300 translate-x-full md:hidden';
    mobileMenu.innerHTML = `
        <button id="close-mobile-menu" class="absolute top-6 right-6 text-3xl">&times;</button>
        <a href="#/" data-link>Inicio</a>
        <a href="#/services" data-link>Servicios</a>
        <a href="#/projects" data-link>Proyectos</a>
        <a href="#/contact" data-link>Contacto</a>
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
