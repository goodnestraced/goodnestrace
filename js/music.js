export function initMusic() {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('music-toggle');
    const eqBars = document.getElementById('eq-bars');
    const musicIcon = document.getElementById('music-icon');
    
    if (!audio || !toggleBtn) return;
    
    let isPlaying = false;
    
    // Recuperar estado guardado
    const savedState = localStorage.getItem('musicPlaying');
    if (savedState === 'true') {
        audio.play().then(() => {
            isPlaying = true;
            updateUI();
        }).catch(() => {
            isPlaying = false;
            updateUI();
        });
    } else {
        updateUI();
    }
    
    function updateUI() {
        if (isPlaying) {
            eqBars.style.opacity = '1';
            musicIcon.style.opacity = '0';
        } else {
            eqBars.style.opacity = '0';
            musicIcon.style.opacity = '1';
        }
    }
    
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            localStorage.setItem('musicPlaying', 'false');
        } else {
            audio.play().catch(err => console.log('Autoplay bloqueado:', err));
            isPlaying = true;
            localStorage.setItem('musicPlaying', 'true');
        }
        updateUI();
    });
    
    // Cuando la música termina (por si acaso)
    audio.addEventListener('ended', () => {
        isPlaying = false;
        updateUI();
        localStorage.setItem('musicPlaying', 'false');
    });
}
