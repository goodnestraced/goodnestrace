const WS_URL = 'wss://api.lanyard.rest/socket';
const USER_ID = '1436938228115570728';

let socket = null;
let reconnectAttempts = 0;
let heartbeatInterval = null;

export function initLanyard() {
    connectWebSocket();
}

function connectWebSocket() {
    if (socket && socket.readyState === WebSocket.OPEN) return;
    
    socket = new WebSocket(WS_URL);
    
    socket.onopen = () => {
        console.log('Lanyard WebSocket connected');
        reconnectAttempts = 0;
        socket.send(JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: USER_ID
            }
        }));
    };
    
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.op === 1) {
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            heartbeatInterval = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ op: 3 }));
                }
            }, data.d.heartbeat_interval);
        } else if (data.op === 0 && (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE')) {
            updateDiscordUI(data.d);
        }
    };
    
    socket.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        setTimeout(connectWebSocket, timeout);
        reconnectAttempts++;
    };
    
    socket.onerror = (err) => {
        console.error('Lanyard WS error', err);
    };
}

function updateDiscordUI(data) {
    const { discord_user, discord_status, activities } = data;
    if (!discord_user) return;
    
    const avatar = discord_user.avatar
        ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`
        : `https://ui-avatars.com/api/?name=${discord_user.username}&background=333&color=fff&size=128`;
    const username = discord_user.global_name || discord_user.username;
    const discriminator = discord_user.discriminator !== '0' ? `#${discord_user.discriminator}` : '';
    const displayName = `${username}${discriminator}`;
    
    const statusMap = {
        online: { class: 'online', text: 'Online' },
        idle: { class: 'idle', text: 'Idle' },
        dnd: { class: 'dnd', text: 'DND' },
        offline: { class: 'offline', text: 'Offline' }
    };
    const statusInfo = statusMap[discord_status] || statusMap.offline;
    
    const customStatus = activities.find(a => a.type === 4);
    const statusText = customStatus ? customStatus.state : statusInfo.text;
    
    // Actualizar en página de contacto (si existe)
    const avatarImg = document.getElementById('discord-avatar');
    const nameSpan = document.getElementById('discord-name');
    const statusDot = document.getElementById('discord-status-dot');
    const statusLabel = document.getElementById('discord-status-text');
    if (avatarImg) avatarImg.src = avatar;
    if (nameSpan) nameSpan.innerText = displayName;
    if (statusDot) statusDot.className = `status-dot ${statusInfo.class}`;
    if (statusLabel) statusLabel.innerText = statusText;
    
    // Actualizar en página de inicio (home)
    const homeAvatar = document.getElementById('discord-avatar-home');
    const homeName = document.getElementById('discord-name-home');
    const homeStatusDot = document.getElementById('discord-status-dot-home');
    const homeStatusText = document.getElementById('discord-status-text-home');
    if (homeAvatar) homeAvatar.src = avatar;
    if (homeName) homeName.innerText = displayName;
    if (homeStatusDot) homeStatusDot.className = `status-dot ${statusInfo.class}`;
    if (homeStatusText) homeStatusText.innerText = statusText;
}
