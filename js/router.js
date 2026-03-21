export default class Router {
    constructor() {
        this.routes = {
            '/': 'home',
            '/services': 'services',
            '/projects': 'projects',
            '/contact': 'contact'
        };
        this.currentPage = null;
    }
    
    async loadPage(pageName) {
        const app = document.getElementById('app');
        if (!app) return;
        
        // Mostrar loader
        app.innerHTML = `<div class="flex justify-center items-center h-64"><div class="loader"></div></div>`;
        
        try {
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            app.innerHTML = html;
            
            // Disparar evento personalizado para scripts específicos de página
            window.dispatchEvent(new CustomEvent('page:loaded', { detail: { page: pageName } }));
            
            // Actualizar título según idioma
            this.updateTitle(pageName);
            
            // Re-aplicar traducciones (los textos se actualizan con i18n)
            if (window.updatePageTranslations) {
                window.updatePageTranslations();
            }
        } catch (error) {
            console.error('Error loading page:', error);
            app.innerHTML = `<div class="text-center text-red-400">Error al cargar la página. Por favor, recarga.</div>`;
        }
    }
    
    updateTitle(pageName) {
        const titles = {
            home: 'Inicio',
            services: 'Servicios',
            projects: 'Proyectos',
            contact: 'Contacto'
        };
        document.title = titles[pageName] || 'AX Studios';
    }
    
    handleRoute() {
        let path = window.location.hash.slice(1) || '/';
        if (!path.startsWith('/')) path = '/' + path;
        const pageName = this.routes[path];
        if (pageName) {
            this.loadPage(pageName);
            this.currentPage = pageName;
        } else {
            window.location.hash = '/';
        }
    }
    
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
        
        // Soporte para clicks en enlaces con data-link
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link && link.getAttribute('href')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                window.location.hash = href;
            }
        });
    }
}
