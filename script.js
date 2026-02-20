function switchApp(appName) {
    // Check if app is already loaded
    const currentSrc = document.getElementById('app-iframe').src;
    const targetSrc = `${appName}/index.html`;
    
    if (currentSrc.endsWith(targetSrc)) {
        console.log(`Already on: ${appName}`);
        return;
    }
    
    // Update menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-app="${appName}"]`).classList.add('active');

    // Update iframe src
    const iframe = document.getElementById('app-iframe');
    iframe.src = targetSrc;

    // Save preference to localStorage
    localStorage.setItem('activeApp', appName);
    
    console.log(`Switched to: ${appName}`);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
}

// Load last active app and sidebar state on page load
window.addEventListener('DOMContentLoaded', () => {
    const lastApp = localStorage.getItem('activeApp') || 'items-matcher';
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    
    const sidebar = document.getElementById('sidebar');
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    }
    
    switchApp(lastApp);
});
